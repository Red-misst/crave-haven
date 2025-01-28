interface ProductErrorDisplayProps {
    error?: unknown;
  }
  
  export default function ProductErrorDisplay({ error }: ProductErrorDisplayProps) {
    const errorMessage = error instanceof Error ? error.message : "Failed to load products";
  
    return (
      <div 
        role="alert" 
        aria-live="polite"
        className="w-full max-w-7xl px-4 py-8 text-center text-red-500"
      >
        <h2 className="text-xl font-semibold">
          ⚠️ Product Loading Error
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          {errorMessage}
        </p>
        <button
        //   onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }
  