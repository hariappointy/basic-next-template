"use client";

import { useDeferredValue, useState } from "react";

import { useFetch } from "@/hooks/useFetch";
import type { Employee } from "@/types/employee";

export function useEmployees(initialEmployees: Employee[]) {
  const { data, error, isLoading, refetch } = useFetch<Employee[]>("/api/employees", {
    initialData: initialEmployees,
    revalidateOnMount: false,
  });
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const employees = data ?? [];

  const filteredEmployees = employees.filter((employee) => {
    const matchesDepartment =
      department === "all" || employee.department.toLowerCase() === department.toLowerCase();
    const matchesQuery =
      deferredQuery.length === 0 ||
      [employee.name, employee.role, employee.email].some((field) =>
        field.toLowerCase().includes(deferredQuery),
      );

    return matchesDepartment && matchesQuery;
  });

  return {
    employees,
    filteredEmployees,
    query,
    setQuery,
    department,
    setDepartment,
    error,
    isLoading,
    refresh: refetch,
  };
}
