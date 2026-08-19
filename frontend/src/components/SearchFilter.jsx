function SearchFilter({
    search,
    status,
    onSearchChange,
    onStatusChange
}) {
    return (
        <div className="search-filter">

            <div>
                <label>Search</label>

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Search company or role"
                />
            </div>

            <div>
                <label>Status</label>

                <select
                    value={status}
                    onChange={(event) =>
                        onStatusChange(event.target.value)
                    }
                >
                    <option value="">All</option>
                    <option value="Applied">Applied</option>
                    <option value="Shortlisted">Shortlisted</option>
                    <option value="Interview">Interview</option>
                    <option value="Selected">Selected</option>
                    <option value="Rejected">Rejected</option>
                </select>
            </div>

        </div>
    );
}

export default SearchFilter;