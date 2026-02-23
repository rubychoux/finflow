import { Card } from '@/components/common/Card';

interface SummaryCardProps {
  label: string;
  value: string;
  subtext?: string;
}

export function SummaryCard({ label, value, subtext }: SummaryCardProps) {
  return (
    <Card className="p-6">
      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
        {label}
      </p>
      <p className="text-2xl font-semibold text-gray-900 tabular-nums">{value}</p>
      {subtext && (
        <p className="text-xs mt-1.5 text-gray-400">{subtext}</p>
      )}
    </Card>
  );
}