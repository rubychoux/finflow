interface EmptyStateProps {
  message: string;
  onReset?: () => void;
}

export function EmptyState({ message, onReset }: EmptyStateProps) {
  return (
    <tr>
      <td colSpan={6} className="px-6 py-16 text-center">
        <p className="text-sm text-gray-500 mb-3">{message}</p>
        {onReset && (
          <button
            onClick={onReset}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Clear filters
          </button>
        )}
      </td>
    </tr>
  );
}