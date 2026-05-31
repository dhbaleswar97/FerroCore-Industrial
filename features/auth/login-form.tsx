"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { loginSchema, type LoginInput } from "@/lib/validations";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/app";

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "marcus.steel@ferrocore.io", password: "FerroCore2026" },
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      await login(data.email, data.password);
      toast.success("Welcome back!");
      router.push(ROUTES.dashboard);
    } catch {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Email address"
        type="email"
        placeholder="you@company.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.password?.message}
        {...register("password")}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
          <input type="checkbox" className="rounded border-border" {...register("rememberMe")} />
          Remember me
        </label>
        <a href="#" className="text-brand-ember hover:underline">
          Forgot password?
        </a>
      </div>

      <Button type="submit" size="lg" loading={isLoading} className="w-full">
        Sign In
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Demo credentials are pre-filled. Just click Sign In.
      </p>
    </form>
  );
}
