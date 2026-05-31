import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/login-form";
import { BRAND } from "@/constants/brand";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-dvh">
      {/* Left — Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0d0c0b] p-12 lg:flex">
        {/* Gradient blobs */}
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-ember/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-brand-cobalt/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-ember">
            <span className="font-display text-sm font-black text-white">FC</span>
          </div>
          <span className="font-display text-lg font-bold text-white">{BRAND.shortName}</span>
        </div>

        <div className="relative z-10">
          <blockquote className="space-y-4">
            <p className="font-display text-3xl font-bold leading-tight text-white">
              &ldquo;Engineering precision <br />
              at industrial scale.&rdquo;
            </p>
            <footer className="text-sm text-white/50">
              — Marcus Steel, CEO · FerroCore Industrial
            </footer>
          </blockquote>
        </div>

        <div className="relative z-10 flex items-center gap-6">
          {[
            { label: "Uptime", value: "99.9%" },
            { label: "Clients", value: "150+" },
            { label: "Countries", value: "22" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-display text-2xl font-black text-white">{value}</p>
              <p className="text-xs text-white/40">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm space-y-8">
          <div>
            <h1 className="font-display text-3xl font-bold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your FerroCore account
            </p>

          </div>

          <LoginForm />

          <p className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link

              href="/auth/register"
              className="font-medium text-brand-ember hover:text-brand-ember/80"
            >
              Get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
