import { savePreferencesAction } from "@/app/actions/settingsActions";
import { Navbar } from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { requireCurrentUser } from "@/lib/auth";
import { getUserPreferences } from "@/lib/db";

interface SettingsPageProps {
  searchParams: Promise<{
    updated?: string;
  }>;
}

export default async function SettingsPage({ searchParams }: SettingsPageProps) {
  const user = await requireCurrentUser();
  const preferences = getUserPreferences(user.id);
  const params = await searchParams;

  return (
    <div className="min-h-screen lg:flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar
          subtitle="Configure notification preferences, focus targets, and reporting defaults."
          title="Settings"
        />

        <main className="space-y-6 px-5 py-6 lg:px-8">
          {params.updated === "1" ? (
            <div className="rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100">
              Preferences updated successfully.
            </div>
          ) : null}

          <form action={savePreferencesAction} className="panel rounded-3xl p-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Default timezone</span>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-teal-300/40"
                  defaultValue={preferences.timezone}
                  name="timezone"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm text-slate-300">Weekly focus goal</span>
                <input
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-teal-300/40"
                  defaultValue={preferences.focusGoal}
                  min={10}
                  name="focusGoal"
                  type="number"
                />
              </label>
            </div>

            <div className="mt-6 space-y-4">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <input
                  className="h-4 w-4 rounded border-white/10 bg-slate-950/30"
                  defaultChecked={preferences.notifyByEmail}
                  name="notifyByEmail"
                  type="checkbox"
                />
                Email me when an employee drops into an at-risk band
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                <input
                  className="h-4 w-4 rounded border-white/10 bg-slate-950/30"
                  defaultChecked={preferences.weeklyDigest}
                  name="weeklyDigest"
                  type="checkbox"
                />
                Send a Monday morning executive summary digest
              </label>
            </div>

            <div className="mt-8 flex items-center justify-between rounded-3xl border border-white/10 bg-slate-950/30 px-5 py-4">
              <div>
                <div className="font-medium text-white">{user.name}</div>
                <div className="text-sm text-slate-400">{user.email}</div>
              </div>
              <button
                className="rounded-2xl bg-teal-300 px-5 py-3 font-medium text-slate-950 transition hover:bg-teal-200"
                type="submit"
              >
                Save preferences
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
