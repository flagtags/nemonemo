import React, { ErrorInfo, Component, ReactNode, ReactFragment } from 'react';

class ErrorBoundary extends Component {
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error);
  }

  render() {
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
