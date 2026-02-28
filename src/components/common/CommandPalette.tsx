import { useState, useEffect, useRef } from 'react';
import type { SortField, TransactionStatus } from '@/types';

interface Props {
  onClose: () => void;
  onResetFilters: () => void;
  onExportCSV: () => void;
  onSortDirect: (field: SortField, direction: 'asc' | 'desc') => void;
  onSetStatuses: (statuses: TransactionStatus[]) => void;
}

interface Command {
  id: string;
  label: string;
  action: () => void;
}

export function CommandPalette({ onClose, onResetFilters, onExportCSV, onSortDirect, onSetStatuses }: Props) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const commands: Command[] = [
    {
      id: 'clear',
      label: 'Clear filters',
      action: () => { onResetFilters(); onClose(); },
    },
    {
      id: 'export',
      label: 'Export CSV',
      action: () => { onExportCSV(); onClose(); },
    },
    {
      id: 'sort-date',
      label: 'Sort by date',
      action: () => { onSortDirect('date', 'desc'); onClose(); },
    },
    {
      id: 'sort-amount',
      label: 'Sort by amount',
      action: () => { onSortDirect('amount', 'desc'); onClose(); },
    },
    {
      id: 'sort-merchant',
      label: 'Sort by merchant',
      action: () => { onSortDirect('merchant', 'asc'); onClose(); },
    },
    {
      id: 'filter-cleared',
      label: 'Filter: Cleared only',
      action: () => { onSetStatuses(['cleared']); onClose(); },
    },
    {
      id: 'filter-pending',
      label: 'Filter: Pending only',
      action: () => { onSetStatuses(['pending']); onClose(); },
    },
  ];

  const filtered = query.trim()
    ? commands.filter(cmd => cmd.label.toLowerCase().includes(query.toLowerCase()))
    : commands;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      {/* Palette */}
      <div className="fixed inset-x-0 top-0 z-50 flex justify-center pt-[20vh] px-4 pointer-events-none">
        <div
          className="w-full max-w-md bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden pointer-events-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          {/* Search */}
          <div className="flex items-center gap-3 px-4 border-b border-gray-100">
            <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type a command..."
              className="flex-1 py-3.5 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
            <kbd className="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200 font-mono">Esc</kbd>
          </div>

          {/* Commands */}
          <ul className="py-1.5 max-h-72 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-3 text-sm text-gray-400">
                No commands match &ldquo;{query}&rdquo;
              </li>
            ) : (
              filtered.map(cmd => (
                <li key={cmd.id}>
                  <button
                    onClick={cmd.action}
                    className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                  >
                    {cmd.label}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
