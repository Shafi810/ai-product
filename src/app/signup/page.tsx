"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertCircle,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  User,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

const signupSchema = z
  .object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

function getPasswordStrength(password: string) {
  let score = 0;
  if (!password) return { score: 0, label: "", color: "", text: "" };

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  switch (score) {
    case 1:
      return { score, label: "Weak", color: "bg-red-500", text: "text-red-400" };
    case 2:
      return { score, label: "Fair", color: "bg-amber-500", text: "text-amber-400" };
    case 3:
      return { score, label: "Good", color: "bg-blue-500", text: "text-blue-400" };
    case 4:
      return { score, label: "Strong", color: "bg-emerald-500", text: "text-emerald-400" };
    default:
      return { score: 0, label: "Too short", color: "bg-red-500", text: "text-red-400" };
  }
}

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const passwordValue = watch("password", "");
  const strength = getPasswordStrength(passwordValue);

  const requirements = [
    { label: "At least 8 characters", met: passwordValue.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(passwordValue) },
    { label: "One number", met: /[0-9]/.test(passwordValue) },
    { label: "One special character", met: /[^A-Za-z0-9]/.test(passwordValue) },
  ];

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      // Simulate API registration delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulated error condition
      if (data.email.includes("taken")) {
        throw new Error("This email address is already registered.");
      }

      toast.add({
        title: "Account Created!",
        description: `Welcome aboard, ${data.name}!`,
        type: "success",
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Registration failed. Try again.";
      setAuthError(message);
      toast.add({
        title: "Sign Up Failed",
        description: message,
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.add({
        title: `${provider} Sign Up`,
        description: `Redirecting to ${provider} authentication...`,
        type: "success",
      });
    } catch {
      setAuthError(`Failed to register using ${provider}.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#08080a] p-6 text-[#f4f4f6]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full opacity-25 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #00f2fe 0%, #7928ca 100%)",
        }}
      />

      <div className="relative w-full max-w-md space-y-5 rounded-2xl border border-[#29293a] bg-[#0f0f14] p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#00f2fe]/10 text-[#00f2fe] mb-2">
            <Sparkles className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#f4f4f6]">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-[#a0a0b2]">
            Start building intelligent autonomous agents today
          </p>
        </div>

        {/* Global Error Banner */}
        {authError && (
          <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-400">
            <AlertCircle className="size-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* OAuth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleOAuth("Google")}
            className="border-[#29293a] bg-[#171720] text-[#f4f4f6] hover:bg-[#20202d] hover:text-white"
          >
            <svg className="mr-2 size-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleOAuth("GitHub")}
            className="border-[#29293a] bg-[#171720] text-[#f4f4f6] hover:bg-[#20202d] hover:text-white"
          >
            <svg className="mr-2 size-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[#29293a]" />
          <span className="absolute bg-[#0f0f14] px-3 text-[11px] font-medium uppercase tracking-wider text-[#69697e]">
            Or register with email
          </span>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
          <div className="space-y-1">
            <label
              htmlFor="name"
              className="text-xs font-medium uppercase tracking-wider text-[#a0a0b2]"
            >
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#69697e]" />
              <Input
                id="name"
                type="text"
                disabled={isLoading}
                placeholder="Alex Morgan"
                {...register("name")}
                className={`bg-[#171720] pl-10 border-[#29293a] text-[#f4f4f6] placeholder:text-[#69697e] focus:border-[#00f2fe] ${
                  errors.name ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-xs font-medium uppercase tracking-wider text-[#a0a0b2]"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#69697e]" />
              <Input
                id="email"
                type="email"
                disabled={isLoading}
                placeholder="name@example.com"
                {...register("email")}
                className={`bg-[#171720] pl-10 border-[#29293a] text-[#f4f4f6] placeholder:text-[#69697e] focus:border-[#00f2fe] ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-xs font-medium uppercase tracking-wider text-[#a0a0b2]"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#69697e]" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="••••••••"
                {...register("password")}
                className={`bg-[#171720] pl-10 pr-10 border-[#29293a] text-[#f4f4f6] placeholder:text-[#69697e] focus:border-[#00f2fe] ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#69697e] hover:text-[#f4f4f6]"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400">{errors.password.message}</p>
            )}

            {passwordValue && (
              <div className="space-y-1.5 pt-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#a0a0b2]">Strength:</span>
                  <span className={`font-semibold ${strength.text}`}>
                    {strength.label}
                  </span>
                </div>
                <div className="flex gap-1.5 h-1.5 w-full">
                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className={`h-full flex-1 rounded-full transition-all duration-300 ${
                        index < strength.score
                          ? strength.color
                          : "bg-[#29293a]"
                      }`}
                    />
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-1 pt-1">
                  {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-[11px]">
                      {req.met ? (
                        <Check className="size-3 text-emerald-400 shrink-0" />
                      ) : (
                        <X className="size-3 text-[#69697e] shrink-0" />
                      )}
                      <span className={req.met ? "text-[#f4f4f6]" : "text-[#69697e]"}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label
              htmlFor="confirmPassword"
              className="text-xs font-medium uppercase tracking-wider text-[#a0a0b2]"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#69697e]" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                disabled={isLoading}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={`bg-[#171720] pl-10 border-[#29293a] text-[#f4f4f6] placeholder:text-[#69697e] focus:border-[#00f2fe] ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-[#f4f4f6] text-[#08080a] font-medium hover:bg-white transition-all shadow-[0_0_20px_-3px_rgba(0,242,254,0.25)] mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                Creating account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-[#a0a0b2]">
          Already have an account?{" "}
          <Link href="/login" className="text-[#00f2fe] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}