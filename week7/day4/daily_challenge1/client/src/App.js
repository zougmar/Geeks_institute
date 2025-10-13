import React, { Component } from 'react';

class App extends Component {
  state = {
    message: '',
    postMessage: '',
    responseMessage: ''
  };

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:4000/api/hello');
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Failed to fetch:', error);
    }
  }

  handleChange = (e) => {
    this.setState({ postMessage: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/world', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post: this.state.postMessage }),
      });
      const data = await response.json();
      this.setState({ responseMessage: data.reply });
    } catch (error) {
      console.error('Error sending POST request:', error);
    }
  };

  render() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100 p-6">
        <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            {this.state.message || 'Connecting to Express...'}
          </h1>

          <form onSubmit={this.handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={this.state.postMessage}
              onChange={this.handleChange}
              placeholder="Type a message to send to Express"
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Send Message
            </button>
          </form>

          {this.state.responseMessage && (
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800 text-center">
              <p>{this.state.responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
