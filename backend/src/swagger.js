const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "Student Internship & Application Tracker API",
            version: "1.0.0",
            description: "REST API for managing student internship applications"
        },

        servers: [
            {
                url: "http://localhost:5000",
                description: "Local development server"
            }
        ],

        paths: {
            "/api/applications": {
                get: {
                    summary: "Get internship applications",
                    description:
                        "Returns all internship applications. Supports optional search and status filters.",

                    parameters: [
                        {
                            name: "search",
                            in: "query",
                            required: false,
                            description: "Search by company name or role",
                            schema: {
                                type: "string"
                            }
                        },
                        {
                            name: "status",
                            in: "query",
                            required: false,
                            description: "Filter applications by status",
                            schema: {
                                type: "string",
                                enum: [
                                    "Applied",
                                    "Shortlisted",
                                    "Interview",
                                    "Selected",
                                    "Rejected"
                                ]
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Applications retrieved successfully"
                        },
                        500: {
                            description: "Failed to fetch applications"
                        }
                    }
                },

                post: {
                    summary: "Create an internship application",
                    description:
                        "Creates a new internship application.",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "canditate_name",
                                        "role",
                                        "applied_date",
                                        "status"
                                    ],
                                    properties: {
                                        canditate_name: {
                                            type: "string",
                                            example: "Google"
                                        },
                                        role: {
                                            type: "string",
                                            example:
                                                "Software Engineer Intern"
                                        },
                                        applied_date: {
                                            type: "string",
                                            format: "date",
                                            example: "2026-08-19"
                                        },
                                        status: {
                                            type: "string",
                                            enum: [
                                                "Applied",
                                                "Shortlisted",
                                                "Interview",
                                                "Selected",
                                                "Rejected"
                                            ],
                                            example: "Applied"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Application created successfully"
                        },
                        500: {
                            description: "Failed to create application"
                        }
                    }
                }
            },

            "/api/applications/{id}": {
                put: {
                    summary: "Update an internship application",
                    description:
                        "Updates an existing internship application.",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "Application ID",
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "canditate_name",
                                        "role",
                                        "applied_date",
                                        "status"
                                    ],
                                    properties: {
                                        canditate_name: {
                                            type: "string",
                                            example: "Google"
                                        },
                                        role: {
                                            type: "string",
                                            example:
                                                "Full Stack Developer Intern"
                                        },
                                        applied_date: {
                                            type: "string",
                                            format: "date",
                                            example: "2026-08-20"
                                        },
                                        status: {
                                            type: "string",
                                            enum: [
                                                "Applied",
                                                "Shortlisted",
                                                "Interview",
                                                "Selected",
                                                "Rejected"
                                            ],
                                            example: "Interview"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        200: {
                            description: "Application updated successfully"
                        },
                        404: {
                            description: "Application not found"
                        },
                        500: {
                            description: "Failed to update application"
                        }
                    }
                },

                delete: {
                    summary: "Delete an internship application",
                    description:
                        "Deletes an existing internship application.",

                    parameters: [
                        {
                            name: "id",
                            in: "path",
                            required: true,
                            description: "Application ID",
                            schema: {
                                type: "integer"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Application deleted successfully"
                        },
                        404: {
                            description: "Application not found"
                        },
                        500: {
                            description: "Failed to delete application"
                        }
                    }
                }
            }
        }
    },

    apis: []
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;