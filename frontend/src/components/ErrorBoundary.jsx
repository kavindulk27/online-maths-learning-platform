import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 border-2 border-dashed border-red-200 rounded-[30px] flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white text-2xl font-black">!</div>
          <h2 className="text-xl font-black text-gray-900">Oops! Something went wrong here.</h2>
          <p className="text-sm text-gray-500 max-w-xs">{this.state.error?.message || "An unexpected error occurred in this module."}</p>
          <button 
            onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}
            className="bg-primary text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-secondary transition-all"
          >
            Reset System Data
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
