"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth-store";
import { registerSchema, type RegisterInput } from "@/lib/validations";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/app";

export function RegisterForm() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      // Simulate registration then auto-login with demo credentials
      await new Promise((r) => setTimeout(r, 800));
      await login("marcus.steel@ferrocore.io", "FerroCore2026");
      toast.success("Account created! Welcome to FerroCore.");
      router.push(ROUTES.dashboard);
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="Alex Morrison"
        leftIcon={<User className="h-4 w-4" />}
        error={errors.name?.message}
        {...register("name")}
      />

      <Input
        label="Business Email"
        type="email"
        placeholder="you@company.com"
        leftIcon={<Mail className="h-4 w-4" />}
        error={errors.email?.message}
        {...register("email")}
      />

      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        placeholder="Min. 8 chars, 1 uppercase, 1 number"
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

      <Input
        label="Confirm Password"
        type={showConfirm ? "text" : "password"}
        placeholder="Re-enter password"
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
        error={errors.confirmPassword?.message}
        {...register("confirmPassword")}
      />

      <p className="text-xs text-muted-foreground">
        By creating an account you agree to our{" "}
        <a href="#" className="text-brand-ember hover:underline">Terms of Service</a>{" "}
        and{" "}
        <a href="#" className="text-brand-ember hover:underline">Privacy Policy</a>.
      </p>

      <Button type="submit" size="lg" loading={isLoading} className="w-full">
        Create Account — Free 14-day Trial
      </Button>
    </form>
  );
}
