function ApplicationTable({ applications, onEdit, onDelete }) {
    return (
        <div className="table-container">
            <h2>Internship Applications</h2>

            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Role</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applications.map((application) => (
                            <tr key={application.application_id}>
                                <td>{application.canditate_name}</td>

                                <td>{application.role}</td>

                                <td>
                                    {new Date(
                                        application.applied_date
                                    ).toLocaleDateString("en-IN")}
                                </td>

                                <td>
                                    {application.status}
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            onEdit(application)
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            onDelete(
                                                application.application_id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ApplicationTable;