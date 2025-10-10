import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    console.error("Error caught by ErrorBoundary:", error);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-danger text-center mt-5">
          <h2>Oops! Something went wrong 😢</h2>
          <p>Please try refreshing the page or going back.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
