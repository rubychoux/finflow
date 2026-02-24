interface DateRangeFilterProps {
  dateFrom: string;
  dateTo: string;
  onDateFromChange: (date: string) => void;
  onDateToChange: (date: string) => void;
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500 whitespace-nowrap">Date range</span>
      <input
        type="date"
        value={dateFrom}
        onChange={e => onDateFromChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <span className="text-xs text-gray-400">to</span>
      <input
        type="date"
        value={dateTo}
        onChange={e => onDateToChange(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
    </div>
  );
}