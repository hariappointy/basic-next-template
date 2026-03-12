import { NextRequest, NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { employeeService } from "@/services/employeeService";
import type { ApiResponse } from "@/types/api";
import type { Employee, EmployeeInput } from "@/types/employee";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? undefined;
  const department = request.nextUrl.searchParams.get("department") ?? undefined;

  const employees = await employeeService.list({ query, department });

  return NextResponse.json<ApiResponse<Employee[]>>({
    success: true,
    data: employees,
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EmployeeInput;
    const employee = await employeeService.create(body);

    return NextResponse.json<ApiResponse<Employee>>(
      {
        success: true,
        data: employee,
      },
      { status: 201 },
    );
  } catch (error) {
    logger.error("Failed to create employee", {
      reason: error instanceof Error ? error.message : "unknown",
    });

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Unable to create employee.",
      },
      { status: 400 },
    );
  }
}
