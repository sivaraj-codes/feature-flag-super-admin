import React from "react";

export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
            background: "#0f1117",
            color: "#e2e8f0",
            gap: "0.75rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Something went wrong
          </h2>
          <p style={{ fontSize: "0.875rem", color: "#64748b" }}>
            {this.state.error?.message}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              marginTop: "0.5rem",
              padding: "0.625rem 1.5rem",
              background: "#6366f1",
              border: "none",
              borderRadius: "0.375rem",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
