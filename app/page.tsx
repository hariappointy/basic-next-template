import Link from "next/link";
import { redirect } from "next/navigation";

import { loginAction } from "@/app/actions/authActions";
import { APP_NAME } from "@/config/constants";
import { getCurrentUser } from "@/lib/auth";

interface HomePageProps {
  searchParams: Promise<{
    error?: string;
    redirect?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const error = params.error === "invalid_credentials";

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8">
      <div className="mx-auto flex min-h-[92vh] w-full max-w-7xl flex-col gap-6 lg:flex-row">
        <section className="panel-strong flex flex-1 flex-col justify-between rounded-[2rem] p-8 lg:p-12">
          <div>
            <div className="inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-teal-200">
              Productivity Intelligence
            </div>
            <h1 className="mt-8 max-w-2xl font-display text-5xl font-semibold leading-tight text-white lg:text-6xl">
              {APP_NAME} gives operations teams a live view into output, engagement, and delivery
              risk.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Review employee trends, surface weekly momentum shifts, and focus managers on the
              teams that need intervention before performance starts slipping.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["89", "Average team productivity"],
              ["32h", "Weekly focus time tracked"],
              ["3", "People flagged for support"],
            ].map(([value, label]) => (
              <article key={label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="font-display text-4xl font-semibold text-white">{value}</div>
                <div className="mt-2 text-sm text-slate-400">{label}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="panel flex w-full max-w-xl flex-col justify-between rounded-[2rem] p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-200">Secure sign in</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white">
              Access the TeamPulse workspace
            </h2>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Use the demo workspace credentials to inspect the dashboard, employee analytics, and
              admin settings.
            </p>
          </div>

          <form action={loginAction} className="mt-8 space-y-5">
            <input name="redirectTo" type="hidden" value={params.redirect ?? "/dashboard"} />
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Work email</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
                defaultValue="admin@teampulse.dev"
                name="email"
                placeholder="name@company.com"
                type="email"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Password</span>
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-teal-300/40"
                defaultValue="teampulse123"
                name="password"
                placeholder="Minimum 8 characters"
                type="password"
              />
            </label>

            {error ? (
              <div className="rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100">
                The email or password was not recognized.
              </div>
            ) : null}

            <button
              className="w-full rounded-2xl bg-teal-300 px-4 py-3 font-medium text-slate-950 transition hover:bg-teal-200"
              type="submit"
            >
              Open dashboard
            </button>
          </form>

          <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-slate-950/25 p-5 text-sm text-slate-300">
            <p>Demo credentials</p>
            <p className="font-mono text-white">admin@teampulse.dev / teampulse123</p>
            <p>
              Need a guided tour? Start with the{" "}
              <Link className="text-teal-200 underline decoration-white/10 underline-offset-4" href="/dashboard">
                dashboard overview
              </Link>{" "}
              after signing in.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
