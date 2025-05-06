export function Spinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div
        role="status"
        className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
