import React from "react";

function FilterBar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  userFilter,
  setUserFilter,
  users
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search task..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
        <option value="All">All Status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <select value={userFilter} onChange={(e) => setUserFilter(e.target.value)}>
        <option value="All">All Users</option>
        {users.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;