import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/features/auth/forgot-password-form";
import { BRAND } from "@/constants/brand";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-ember">
              <span className="font-display text-sm font-black text-white">FC</span>
            </div>
            <span className="font-display text-lg font-bold">{BRAND.shortName}</span>
          </Link>
          <h1 className="font-display text-3xl font-bold">Reset your password</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your business email and we&apos;ll send a reset link within 2 minutes.
          </p>
        </div>

        <ForgotPasswordForm />

        <p className="text-center text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link href="/auth/login" className="font-medium text-brand-ember hover:text-brand-ember/80">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
