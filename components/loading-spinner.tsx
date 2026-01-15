export function LoadingSpinner() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <div className="text-center">
        <div className="loading-spinner mb-4"></div>
        <p className="text-secondary">Loading content...</p>
      </div>
    </div>
  );
}
