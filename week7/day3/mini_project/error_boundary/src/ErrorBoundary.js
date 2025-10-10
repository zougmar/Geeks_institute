import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => window.location.reload();

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 border border-red-300 rounded-xl p-6 my-6 shadow">
          <h2 className="text-lg font-semibold text-red-600">
            ⚠️ An error occurred in this component.
          </h2>
          <button
            onClick={this.handleReload}
            className="text-blue-600 underline mt-2"
          >
            Reload this page
          </button>

          <details className="mt-3 bg-white p-3 rounded text-gray-700 whitespace-pre-wrap">
            {this.state.error?.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
