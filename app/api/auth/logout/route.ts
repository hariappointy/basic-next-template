import { NextResponse } from "next/server";

import { clearAuthCookie } from "@/lib/auth";
import type { ApiResponse } from "@/types/api";

export async function POST() {
  await clearAuthCookie();

  return NextResponse.json<ApiResponse<null>>({
    success: true,
    data: null,
  });
}
