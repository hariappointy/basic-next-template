import { NextResponse } from "next/server";

import { logger } from "@/lib/logger";
import { employeeService } from "@/services/employeeService";
import type { ApiResponse } from "@/types/api";
import type { Employee, EmployeeInput } from "@/types/employee";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const employee = await employeeService.getById(id);

  if (!employee) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Employee not found.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json<ApiResponse<Employee>>({
    success: true,
    data: employee,
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = (await request.json()) as Partial<EmployeeInput>;
    const employee = await employeeService.update(id, body);

    if (!employee) {
      return NextResponse.json<ApiResponse<null>>(
        {
          success: false,
          error: "Employee not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json<ApiResponse<Employee>>({
      success: true,
      data: employee,
    });
  } catch (error) {
    logger.error("Failed to update employee", {
      reason: error instanceof Error ? error.message : "unknown",
    });

    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Unable to update employee.",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(_: Request, context: RouteContext) {
  const { id } = await context.params;
  const removed = await employeeService.remove(id);

  if (!removed) {
    return NextResponse.json<ApiResponse<null>>(
      {
        success: false,
        error: "Employee not found.",
      },
      { status: 404 },
    );
  }

  return NextResponse.json<ApiResponse<{ removed: boolean }>>({
    success: true,
    data: {
      removed: true,
    },
  });
}
