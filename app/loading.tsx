import { LoadingSpinner } from "@/components/loading-spinner";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="panel rounded-3xl px-8 py-6 text-center">
        <LoadingSpinner className="mx-auto" size="lg" />
        <p className="mt-4 text-sm text-slate-300">Loading TeamPulse workspace...</p>
      </div>
    </div>
  );
}
