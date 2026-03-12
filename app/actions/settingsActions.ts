"use server";

import { redirect } from "next/navigation";

import { requireCurrentUser } from "@/lib/auth";
import { updateUserPreferences } from "@/lib/db";

export async function savePreferencesAction(formData: FormData): Promise<void> {
  const user = await requireCurrentUser();

  updateUserPreferences(user.id, {
    timezone: String(formData.get("timezone") ?? "UTC"),
    notifyByEmail: formData.get("notifyByEmail") === "on",
    weeklyDigest: formData.get("weeklyDigest") === "on",
    focusGoal: Number(formData.get("focusGoal") ?? 24),
  });

  redirect("/settings?updated=1");
}
