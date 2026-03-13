import type { NextRequest } from "next/server";

import { handleAuthMiddleware } from "@/middleware/authMiddleware";

export function middleware(request: NextRequest) {
  return handleAuthMiddleware(request);
}

export const config = {
  matcher: ["/dashboard/:path*", "/employees/:path*", "/settings/:path*", "/api/employees/:path*", "/api/analytics/:path*"],
};
