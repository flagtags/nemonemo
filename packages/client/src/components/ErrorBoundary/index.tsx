import React, { ErrorInfo, Component, ReactNode, ReactFragment } from 'react';
import { useRouteError } from 'react-router-dom';

interface IProps {
  children?: ReactNode;
  fallback: ReactNode;
}

interface IState {
  isError: boolean;
}

class ErrorBoundary extends Component<IProps, IState> {
  state: { isError: boolean };

  constructor(props: IProps) {
    super(props);
    this.state = { isError: false };
  }

  static getDerivedStateFromError(error: any) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { isError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // console.error('componentDidCatch', error);
    // this.setState({ isError: true });
  }

  render() {
    if (this.state.isError) {
      return <>{this.props.fallback}</>;
    }
    return <>{this.props.children}</>;
  }
}

export default ErrorBoundary;
