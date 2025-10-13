import React, { Component } from "react";

class UserTable extends Component {
  state = {
    users: [],
    filteredUsers: [],
    loading: true,
    error: null,
    searchQuery: "",
    filter: "all",
    sort: "none",
    statusFilter: "all",
    currentPage: 1,
    usersPerPage: 6,
    viewMode: "cards",
    selectedUsers: new Set(),
  };

  componentDidMount() {
    fetch("/users")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        const usersWithStatus = data.map((user) => ({
          ...user,
          status: Math.random() > 0.5 ? "Active" : "Inactive",
        }));
        this.setState({
          users: usersWithStatus,
          filteredUsers: usersWithStatus,
          loading: false,
        });
      })
      .catch((err) => this.setState({ error: err, loading: false }));
  }

  // Filters & Sorting
  applyFilters = () => {
    let { users, searchQuery, filter, sort, statusFilter } = this.state;
    let filtered = [...users];

    if (searchQuery)
      filtered = filtered.filter((u) =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (filter === "id>1") filtered = filtered.filter((u) => u.id > 1);
    else if (filter === "id<=1") filtered = filtered.filter((u) => u.id <= 1);

    if (statusFilter === "Active") filtered = filtered.filter((u) => u.status === "Active");
    else if (statusFilter === "Inactive") filtered = filtered.filter((u) => u.status === "Inactive");

    if (sort === "username-asc") filtered.sort((a, b) => a.username.localeCompare(b.username));
    else if (sort === "username-desc") filtered.sort((a, b) => b.username.localeCompare(a.username));
    else if (sort === "id-asc") filtered.sort((a, b) => a.id - b.id);
    else if (sort === "id-desc") filtered.sort((a, b) => b.id - a.id);

    this.setState({ filteredUsers: filtered });
  };

  // Handlers
  handleSearch = (e) => this.setState({ searchQuery: e.target.value, currentPage: 1 }, this.applyFilters);
  handleFilter = (e) => this.setState({ filter: e.target.value, currentPage: 1 }, this.applyFilters);
  handleSort = (e) => this.setState({ sort: e.target.value }, this.applyFilters);
  handleStatusFilter = (e) => this.setState({ statusFilter: e.target.value, currentPage: 1 }, this.applyFilters);
  handlePageChange = (page) => this.setState({ currentPage: page });
  toggleView = (mode) => this.setState({ viewMode: mode });
  
  handleSelectUser = (id) => {
    const selectedUsers = new Set(this.state.selectedUsers);
    if (selectedUsers.has(id)) selectedUsers.delete(id);
    else selectedUsers.add(id);
    this.setState({ selectedUsers });
  };

  handleSelectAll = () => {
    const { currentUsers, selectedUsers } = this;
    const newSelected = new Set(selectedUsers);
    currentUsers.forEach((user) => {
      if (!newSelected.has(user.id)) newSelected.add(user.id);
    });
    this.setState({ selectedUsers: newSelected });
  };

  handleBulkAction = (action) => {
    const { users, selectedUsers } = this.state;
    let updatedUsers = [...users];

    if (action === "delete") {
      updatedUsers = updatedUsers.filter((u) => !selectedUsers.has(u.id));
    } else if (action === "activate") {
      updatedUsers = updatedUsers.map((u) =>
        selectedUsers.has(u.id) ? { ...u, status: "Active" } : u
      );
    } else if (action === "deactivate") {
      updatedUsers = updatedUsers.map((u) =>
        selectedUsers.has(u.id) ? { ...u, status: "Inactive" } : u
      );
    }

    this.setState({ users: updatedUsers, selectedUsers: new Set() }, this.applyFilters);
  };

  render() {
    const {
      filteredUsers,
      loading,
      error,
      searchQuery,
      filter,
      sort,
      statusFilter,
      currentPage,
      usersPerPage,
      viewMode,
      selectedUsers,
    } = this.state;

    if (loading) return <p className="text-blue-500 text-center mt-10 text-lg">Loading users...</p>;
    if (error) return <p className="text-red-500 text-center mt-10 text-lg">Error: {error.message}</p>;

    // Pagination
    const indexOfLast = currentPage * usersPerPage;
    const indexOfFirst = indexOfLast - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    this.currentUsers = currentUsers; // for select all

    return (
      <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={this.handleSearch}
            placeholder="Search by username..."
            className="flex-1 px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select value={filter} onChange={this.handleFilter} className="px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All IDs</option>
            <option value="id>1">ID &gt; 1</option>
            <option value="id<=1">ID ≤ 1</option>
          </select>
          <select value={statusFilter} onChange={this.handleStatusFilter} className="px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <select value={sort} onChange={this.handleSort} className="px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="none">No Sorting</option>
            <option value="username-asc">Username ↑</option>
            <option value="username-desc">Username ↓</option>
            <option value="id-asc">ID ↑</option>
            <option value="id-desc">ID ↓</option>
          </select>

          {/* View toggle */}
          <div className="flex space-x-2">
            <button onClick={() => this.toggleView("cards")} className={`px-3 py-1 rounded-lg ${viewMode === "cards" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Card View</button>
            <button onClick={() => this.toggleView("table")} className={`px-3 py-1 rounded-lg ${viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>Table View</button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.size > 0 && (
          <div className="flex space-x-2 mb-4">
            <button onClick={() => this.handleBulkAction("activate")} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">Activate</button>
            <button onClick={() => this.handleBulkAction("deactivate")} className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Deactivate</button>
            <button onClick={() => this.handleBulkAction("delete")} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
          </div>
        )}

        {/* Content */}
        {viewMode === "cards" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentUsers.map((user) => (
              <div key={user.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 duration-300 p-6 flex flex-col items-center">
                <input type="checkbox" className="mb-2" checked={selectedUsers.has(user.id)} onChange={() => this.handleSelectUser(user.id)} />
                <img className="w-20 h-20 rounded-full mb-4 border-2 border-blue-500" src={`https://i.pravatar.cc/150?img=${user.id}`} alt={user.username} />
                <h2 className="text-xl font-semibold text-gray-800 mb-1">{user.username}</h2>
                <p className="text-gray-500 text-sm mb-2">ID: {user.id}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} mb-3`}>{user.status}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3"><input type="checkbox" onChange={this.handleSelectAll} /></th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4"><input type="checkbox" checked={selectedUsers.has(user.id)} onChange={() => this.handleSelectUser(user.id)} /></td>
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.username}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-sm font-semibold ${user.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{user.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button key={page} onClick={() => this.handlePageChange(page)} className={`px-3 py-1 rounded-lg ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"} transition`}>{page}</button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default UserTable;
