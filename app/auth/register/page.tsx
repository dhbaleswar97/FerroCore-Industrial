import type { Metadata } from "next";
import { RegisterForm } from "@/features/auth/register-form";
import { BRAND } from "@/constants/brand";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Get Started — FerroCore Industrial",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh">
      {/* Left — Brand panel */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#0d0c0b] p-12 lg:flex">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-ember/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-80 w-80 rounded-full bg-brand-cobalt/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-ember">
            <span className="font-display text-sm font-black text-white">FC</span>
          </div>
          <span className="font-display text-lg font-bold text-white">{BRAND.shortName}</span>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <p className="font-display text-3xl font-bold leading-tight text-white">
              &ldquo;The platform that finally<br />
              made procurement simple.&rdquo;
            </p>
            <footer className="mt-3 text-sm text-white/50">
              — Diana Forge, COO · FerroCore Industrial
            </footer>
          </div>

          <div className="space-y-4">
            {[
              { icon: "✓", text: "14-day free trial — no credit card required" },
              { icon: "✓", text: "Instant access to all modules" },
              { icon: "✓", text: "Dedicated onboarding support included" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-ember/20 text-xs font-bold text-brand-ember">
                  {icon}
                </span>
                <span className="text-sm text-white/60">{text}</span>
              </div>
            ))}
          </div>
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
            {/* Mobile logo */}
            <div className="mb-6 flex items-center gap-2 lg:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-ember">
                <span className="text-sm font-black text-white">FC</span>
              </div>
              <span className="font-display text-base font-bold">{BRAND.shortName}</span>
            </div>
            <h1 className="font-display text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Start your 14-day free trial — no credit card required
            </p>
          </div>

          <RegisterForm />

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-brand-ember hover:text-brand-ember/80"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
