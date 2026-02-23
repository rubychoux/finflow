interface ErrorBannerProps {
  message: string;
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="rounded-lg bg-red-50 border border-red-200 p-4">
      <p className="text-sm font-medium text-red-800">Something went wrong</p>
      <p className="text-sm text-red-700 mt-1">{message}</p>
    </div>
  );
}