export function Button({ children, className, ...props }) {
    return (
      <button
        className={`px-5 py-2 rounded-xl font-semibold shadow-sm ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  