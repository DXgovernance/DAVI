import React from 'react';
import { GlobalNotification } from 'components/GlobalNotification';

const handledErrorTypes = {
  CacheLoadError:
    'We ran into an error while trying to update the cache. Data shown below might be incorrect or outdated. Please reload the page and try again.',
  default: 'Something went wrong',
};

export class GlobalErrorBoundary extends React.Component<
  { children: JSX.Element },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: null };
  }

  static getDerivedStateFromError(error: Error) {
    const errorMessage = GlobalErrorBoundary.getErrorMessage(error.name);
    return {
      hasError: true,
      errorMessage,
    };
  }

  componentDidMount() {
    window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'unhandledrejection',
      this.promiseRejectionHandler
    );
  }

  private promiseRejectionHandler = (event: PromiseRejectionEvent) => {
    const errorMessage = GlobalErrorBoundary.getErrorMessage(
      event?.reason?.name
    );
    if (errorMessage) {
      this.setState({
        hasError: true,
        errorMessage: errorMessage,
      });
    }
  };

  private static getErrorMessage(errorName) {
    if (Object.keys(handledErrorTypes).includes(errorName)) {
      return handledErrorTypes[errorName];
    }

    return handledErrorTypes.default;
  }

  render() {
    const { hasError, errorMessage } = this.state;
    return (
      <>
        <GlobalNotification
          visible={hasError}
          type="ERROR"
          message={errorMessage}
        />
        {!hasError && this.props.children}
      </>
    );
  }
}
