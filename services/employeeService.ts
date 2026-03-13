import {
  createEmployee,
  deleteEmployee,
  getEmployeeById,
  listDepartments,
  listEmployees,
  updateEmployee,
} from "@/lib/db";
import type { Employee, EmployeeFilters, EmployeeInput } from "@/types/employee";

export const employeeService = {
  async list(filters?: EmployeeFilters): Promise<Employee[]> {
    return listEmployees(filters);
  },

  async getById(id: string): Promise<Employee | null> {
    return getEmployeeById(id);
  },

  async create(input: EmployeeInput): Promise<Employee> {
    return createEmployee(input);
  },

  async update(id: string, patch: Partial<EmployeeInput>): Promise<Employee | null> {
    return updateEmployee(id, patch);
  },

  async remove(id: string): Promise<boolean> {
    return deleteEmployee(id);
  },

  async departments(): Promise<string[]> {
    return listDepartments();
  },
};
