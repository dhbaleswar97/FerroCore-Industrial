import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/constants/brand";

export const metadata: Metadata = {
  title: "Get Started",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-ember">
            <span className="font-display text-sm font-black text-white">FC</span>
          </div>
          <h1 className="font-display text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Start your 14-day free trial — no credit card required
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
          <p className="text-center text-sm text-muted-foreground">
            Registration form coming soon. For enterprise access, contact{" "}
            <a
              href={`mailto:${BRAND.email}`}
              className="font-medium text-brand-ember hover:underline"
            >
              {BRAND.email}
            </a>
          </p>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-brand-ember hover:text-brand-ember/80">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
