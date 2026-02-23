export type TransactionStatus = 'cleared' | 'pending' | 'declined';

export type TransactionCategory =
  | 'software'
  | 'travel'
  | 'meals'
  | 'office'
  | 'marketing'
  | 'hardware'
  | 'utilities'
  | 'other';

export interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category: TransactionCategory;
  status: TransactionStatus;
  cardHolder: string;
  last4: string;
  memo?: string;
}

export type SortField = keyof Pick<Transaction, 'date' | 'amount' | 'merchant'>;
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  search: string;
  categories: TransactionCategory[];
  statuses: TransactionStatus[];
  dateFrom: string;
  dateTo: string;
}

export interface Budget {
  category: TransactionCategory;
  limitCents: number;
  spentCents: number;
}

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };