import { useState } from "react";

function ApplicationForm({ onApplicationAdded }) {
    const [formData, setFormData] = useState({
        company_name: "",
        role: "",
        applied_date: "",
        status: "Applied"
    });

    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                "/api/applications",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add application");
            }

            const newApplication = await response.json();

            setMessage("Application added successfully!");

            setFormData({
                company_name: "",
                role: "",
                applied_date: "",
                status: "Applied"
            });

            onApplicationAdded(newApplication);

        } catch (error) {
            console.error(error);
            setMessage("Failed to add application.");
        }
    };

    return (
        <div className="form-container">
            <h2>Add Internship Application</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label>Candidate Name</label>

                    <input
                        type="text"
                        name="company_name"
                        value={formData.company_name}
                        onChange={handleChange}
                        placeholder="Enter Candidate name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Role</label>

                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        placeholder="Enter internship role"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Applied Date</label>

                    <input
                        type="date"
                        name="applied_date"
                        value={formData.applied_date}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview">Interview</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <button type="submit">
                    Add Application
                </button>

            </form>

            {message && (
                <p className="form-message">
                    {message}
                </p>
            )}
        </div>
    );
}

export default ApplicationForm;