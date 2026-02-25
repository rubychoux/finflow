import type { Transaction, TransactionCategory, TransactionStatus } from '@/types';

const merchants: Record<TransactionCategory, string[]> = {
  software: ['GitHub', 'Figma', 'Notion', 'Linear', 'Vercel', 'AWS', 'Datadog', 'Stripe'],
  travel: ['Delta Airlines', 'United', 'Marriott', 'Airbnb', 'Lyft', 'Uber', 'Hertz'],
  meals: ['Sweetgreen', 'Chipotle', 'Doordash', 'Grubhub', 'The Smith', 'Nobu'],
  office: ['WeWork', 'Staples', 'Amazon Business', 'IKEA', 'Costco'],
  marketing: ['Meta Ads', 'Google Ads', 'Mailchimp', 'HubSpot', 'Clearbit'],
  hardware: ['Apple', 'Dell', 'Best Buy', 'B&H Photo', 'Lenovo'],
  utilities: ['ConEd', 'AT&T', 'Comcast', 'Verizon'],
  other: ['Misc Vendor', 'Petty Cash', 'Reimbursement'],
};

const cardHolders = [
  'Alex Chen', 'Jordan Smith', 'Taylor Kim', 'Morgan Davis',
  'Riley Johnson', 'Casey Williams', 'Quinn Martinez', 'Drew Thompson',
];

const statuses: TransactionStatus[] = ['cleared', 'cleared', 'cleared', 'pending', 'declined'];

function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

const rng = seededRandom(42);

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

function randomInt(min: number, max: number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

const REFERENCE_DATE = new Date('2026-02-25');

function randomDate(daysBack: number): string {
  const date = new Date(REFERENCE_DATE);
  date.setDate(date.getDate() - Math.floor(rng() * daysBack));
  return date.toISOString().split('T')[0];
}

export function generateTransactions(count: number = 200): Transaction[] {
  const categories = Object.keys(merchants) as TransactionCategory[];

  return Array.from({ length: count }, (_, i) => {
    const category = randomItem(categories);
    const merchant = randomItem(merchants[category]);

    return {
      id: `txn_${String(i + 1).padStart(6, '0')}`,
      merchant,
      amount: randomInt(1000, 1000000),
      date: randomDate(90),
      category,
      status: randomItem(statuses),
      cardHolder: randomItem(cardHolders),
      last4: String(randomInt(1000, 9999)),
      memo: rng() > 0.7 ? `Q${Math.ceil(rng() * 4)} expense` : undefined,
    };
  });
}

export const MOCK_TRANSACTIONS = generateTransactions(200);