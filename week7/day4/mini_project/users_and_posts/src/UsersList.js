import React, { Component } from "react";

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isLoaded: false,
      errorMsg: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then(data => this.setState({ users: data, isLoaded: true }))
      .catch(error => this.setState({ errorMsg: error.message, isLoaded: true }));
  }

  render() {
    const { users, isLoaded, errorMsg } = this.state;

    if (!isLoaded) {
      return <div className="text-gray-500 text-center my-10">Loading users...</div>;
    }

    if (errorMsg) {
      return <div className="text-red-500 text-center my-10">{errorMsg}</div>;
    }

    return (
      <div className="max-w-6xl mx-auto my-10 px-4">
        <h2 className="text-3xl font-bold mb-6">Users</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {users.map(user => (
            <div
              key={user.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2 text-green-600">{user.name}</h3>
              <p className="text-gray-700">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UsersList;
