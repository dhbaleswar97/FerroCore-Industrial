"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle2 } from "lucide-react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});
type FormInput = z.infer<typeof schema>;

export function ForgotPasswordForm() {
  const [sent, setSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInput>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormInput) => {
    await new Promise((r) => setTimeout(r, 900));
    setSubmittedEmail(data.email);
    setSent(true);
    toast.success("Reset link sent! Check your inbox.");
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <div>
          <h3 className="font-display text-lg font-bold">Check your inbox</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We sent a reset link to{" "}
            <span className="font-medium text-foreground">{submittedEmail}</span>.
            <br />
            It expires in 30 minutes.
          </p>
        </div>
        <button
          onClick={() => setSent(false)}
          className="text-sm text-brand-ember hover:underline"
        >
          Didn&apos;t receive it? Resend
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Business Email"
        type="email"
        placeholder="you@company.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register("email")}
      />
      <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
        Send Reset Link
      </Button>
    </form>
  );
}
