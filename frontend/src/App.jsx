import { useEffect, useState } from "react";
import "./App.css";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationTable from "./components/ApplicationTable";
import SearchFilter from "./components/SearchFilter";

const API_URL =
    import.meta.env.VITE_API_URL ||
    "/api/applications";


function App() {
    const [applications, setApplications] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    // Edit form state
    const [editingApplication, setEditingApplication] = useState(null);

    const fetchApplications = async () => {
        try {
            const params = new URLSearchParams();

            if (search) {
                params.append("search", search);
            }

            if (status) {
                params.append("status", status);
            }

            const url = params.toString()
                ? `${API_URL}?${params.toString()}`
                : API_URL;

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Failed to fetch applications");
            }

            const data = await response.json();

            setApplications(data);
        } catch (error) {
            console.error(
                "Error fetching applications:",
                error
            );
        }
    };

    useEffect(() => {
        fetchApplications();
    }, [search, status]);

    const handleApplicationAdded = (newApplication) => {
        setApplications((currentApplications) => [
            ...currentApplications,
            newApplication
        ]);
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to delete application"
                );
            }

            setApplications((currentApplications) =>
                currentApplications.filter(
                    (application) =>
                        application.application_id !== id
                )
            );
        } catch (error) {
            console.error(
                "Error deleting application:",
                error
            );
        }
    };

    // Open edit form
    const handleEdit = async (application) => {
    const company_name = window.prompt(
        "Company Name:",
        application.company_name
    );

    if (company_name === null) return;

    const role = window.prompt(
        "Role:",
        application.role
    );

    if (role === null) return;

    const applied_date = window.prompt(
        "Applied Date (YYYY-MM-DD):",
        application.applied_date.substring(0, 10)
    );

    if (applied_date === null) return;

    const status = window.prompt(
        "Status (Applied, Shortlisted, Interview, Selected, Rejected):",
        application.status
    );

    if (status === null) return;

    try {
        const response = await fetch(
            `${API_URL}/${application.application_id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    company_name,
                    role,
                    applied_date,
                    status
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update application");
        }

        const updatedApplication = await response.json();

        setApplications((currentApplications) =>
            currentApplications.map((item) =>
                item.application_id ===
                updatedApplication.application_id
                    ? updatedApplication
                    : item
            )
        );

    } catch (error) {
        console.error("Error updating application:", error);
        alert("Failed to update application");
    }
};

    // Update edit form values
    const handleEditChange = (event) => {
        const { name, value } = event.target;

        setEditingApplication((current) => ({
            ...current,
            [name]: value
        }));
    };

    // Submit updated application
    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `${API_URL}/${editingApplication.application_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        company_name:
                            editingApplication.company_name,
                        role:
                            editingApplication.role,
                        applied_date:
                            editingApplication.applied_date,
                        status:
                            editingApplication.status
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Failed to update application"
                );
            }

            const updatedApplication =
                await response.json();

            setApplications((currentApplications) =>
                currentApplications.map((item) =>
                    item.application_id ===
                    updatedApplication.application_id
                        ? updatedApplication
                        : item
                )
            );

            // Close edit form
            setEditingApplication(null);

        } catch (error) {
            console.error(
                "Error updating application:",
                error
            );
        }
    };

    // Cancel editing
    const handleEditCancel = () => {
        setEditingApplication(null);
    };

    return (
        <div className="app-container">

            <header className="app-header">
                <h1>
                    Student Internship & Application Tracker
                </h1>

                <p>
                    Track and manage your internship applications
                </p>
            </header>

            <main>

                <ApplicationForm
                    onApplicationAdded={
                        handleApplicationAdded
                    }
                />

                <SearchFilter
                    search={search}
                    status={status}
                    onSearchChange={setSearch}
                    onStatusChange={setStatus}
                />

                <ApplicationTable
                    applications={applications}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

            </main>

            {/* Edit Application Modal */}

            {editingApplication && (
                <div className="edit-overlay">

                    <div className="edit-modal">

                        <h2>
                            Edit Internship Application
                        </h2>

                        <form
                            onSubmit={handleEditSubmit}
                        >

                            <div className="form-group">

                                <label>
                                    Company Name
                                </label>

                                <input
                                    type="text"
                                    name="company_name"
                                    value={
                                        editingApplication.company_name
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Role
                                </label>

                                <input
                                    type="text"
                                    name="role"
                                    value={
                                        editingApplication.role
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Applied Date
                                </label>

                                <input
                                    type="date"
                                    name="applied_date"
                                    value={
                                        editingApplication.applied_date
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Status
                                </label>

                                <select
                                    name="status"
                                    value={
                                        editingApplication.status
                                    }
                                    onChange={
                                        handleEditChange
                                    }
                                    required
                                >
                                    <option value="Applied">
                                        Applied
                                    </option>

                                    <option value="Shortlisted">
                                        Shortlisted
                                    </option>

                                    <option value="Interview">
                                        Interview
                                    </option>

                                    <option value="Selected">
                                        Selected
                                    </option>

                                    <option value="Rejected">
                                        Rejected
                                    </option>

                                </select>

                            </div>

                            <div className="edit-actions">

                                <button
                                    type="button"
                                    onClick={
                                        handleEditCancel
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                >
                                    Update Application
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
}

export default App;
