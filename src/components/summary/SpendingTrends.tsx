import { useMemo, useState, useRef } from 'react';
import { MOCK_TRANSACTIONS } from '@/mock/data';

const CHART_H = 80;
const CHART_W = 500;
const PAD_BOTTOM = 22;
const BAR_GAP = 3;

interface WeekBucket {
  weekStart: Date;
  weekEnd: Date;
  total: number; // cents
}

function toUTCDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function getWeekStart(date: Date): Date {
  const day = date.getUTCDay(); // 0 = Sun
  const diff = day === 0 ? -6 : 1 - day; // shift to Monday
  const monday = new Date(date);
  monday.setUTCDate(date.getUTCDate() + diff);
  return monday;
}

function fmt(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
}

function fmtDollars(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function SpendingTrends() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{
    left: number;
    top: number;
    bucket: WeekBucket;
  } | null>(null);

  const buckets = useMemo((): WeekBucket[] => {
    const map = new Map<string, { weekStart: Date; total: number }>();

    for (const txn of MOCK_TRANSACTIONS) {
      if (txn.status === 'declined') continue;
      const weekStart = getWeekStart(toUTCDate(txn.date));
      const key = weekStart.toISOString().slice(0, 10);
      const existing = map.get(key);
      if (existing) {
        existing.total += txn.amount;
      } else {
        map.set(key, { weekStart: new Date(weekStart), total: txn.amount });
      }
    }

    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, { weekStart, total }]) => {
        const weekEnd = new Date(weekStart);
        weekEnd.setUTCDate(weekStart.getUTCDate() + 6);
        return { weekStart, weekEnd, total };
      });
  }, []);

  if (buckets.length === 0) return null;

  const maxTotal = Math.max(...buckets.map(b => b.total));
  const n = buckets.length;
  const barW = (CHART_W - (n - 1) * BAR_GAP) / n;

  function handleBarEnter(e: React.MouseEvent<SVGRectElement>, bucket: WeekBucket) {
    if (!containerRef.current) return;
    const cRect = containerRef.current.getBoundingClientRect();
    const bRect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      left: bRect.left + bRect.width / 2 - cRect.left,
      top: bRect.top - cRect.top,
      bucket,
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 px-5 pt-5 pb-4 shadow-sm">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
        Weekly Spend
      </p>

      <div ref={containerRef} className="relative">
        <svg
          viewBox={`0 0 ${CHART_W} ${CHART_H + PAD_BOTTOM}`}
          className="w-full"
          style={{ overflow: 'visible' }}
        >
          {buckets.map((bucket, i) => {
            const barH = Math.max(2, (bucket.total / maxTotal) * CHART_H);
            const x = i * (barW + BAR_GAP);
            const y = CHART_H - barH;
            const isHovered = tooltip?.bucket === bucket;

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barW}
                  height={barH}
                  rx={2}
                  fill="#6366f1"
                  opacity={isHovered ? 1 : 0.65}
                  style={{ cursor: 'pointer', transition: 'opacity 0.1s' }}
                  onMouseEnter={e => handleBarEnter(e, bucket)}
                  onMouseLeave={() => setTooltip(null)}
                />
                {/* Label every other bar so they don't crowd */}
                {i % 2 === 0 && (
                  <text
                    x={x + barW / 2}
                    y={CHART_H + PAD_BOTTOM - 2}
                    textAnchor="middle"
                    fontSize={7.5}
                    fill="#9ca3af"
                    fontFamily="system-ui, sans-serif"
                  >
                    {fmt(bucket.weekStart)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {tooltip && (
          <div
            className="absolute pointer-events-none z-10 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg"
            style={{
              left: tooltip.left,
              top: tooltip.top - 8,
              transform: 'translate(-50%, -100%)',
              whiteSpace: 'nowrap',
            }}
          >
            <p className="text-gray-400">
              {fmt(tooltip.bucket.weekStart)} – {fmt(tooltip.bucket.weekEnd)}
            </p>
            <p className="font-semibold text-indigo-300 mt-0.5">
              {fmtDollars(tooltip.bucket.total)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
