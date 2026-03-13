import { NextResponse } from "next/server";

import { analyticsService } from "@/services/analyticsService";
import type { ApiResponse } from "@/types/api";
import type { AnalyticsSummary } from "@/types/analytics";

export async function GET() {
  const summary = await analyticsService.getSummary();

  return NextResponse.json<ApiResponse<AnalyticsSummary>>({
    success: true,
    data: summary,
  });
}
