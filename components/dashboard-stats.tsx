import type { AnalyticsSummary } from "@/types/analytics";

interface DashboardStatsProps {
  summary: AnalyticsSummary;
}

export function DashboardStats({ summary }: DashboardStatsProps) {
  const cards = [
    {
      label: "Average productivity",
      value: summary.averageProductivity,
      suffix: "/100",
    },
    {
      label: "Average engagement",
      value: summary.averageEngagement,
      suffix: "/100",
    },
    {
      label: "Focus hours",
      value: summary.focusHours,
      suffix: "hrs",
    },
    {
      label: "Retention risks",
      value: summary.retentionRiskCount,
      suffix: "people",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="panel rounded-3xl p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{card.label}</p>
          <div className="mt-4 flex items-end gap-2">
            <p className="font-display text-4xl font-semibold text-white">{card.value}</p>
            <p className="pb-1 text-sm text-slate-400">{card.suffix}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
