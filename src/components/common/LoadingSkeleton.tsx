export function TableRowSkeleton() {
  return (
    <tr className="border-b border-gray-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
        </td>
      ))}
    </tr>
  );
}

export function SummaryCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="h-3 bg-gray-100 rounded animate-pulse w-24 mb-3" />
      <div className="h-7 bg-gray-100 rounded animate-pulse w-36 mb-2" />
      <div className="h-3 bg-gray-100 rounded animate-pulse w-20" />
    </div>
  );
}