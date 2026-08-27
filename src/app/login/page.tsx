"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  // 🚀 Safe Client Simulation: Recruiter triggers validation without backend server crashes
  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setAuthError(null);

    // Dynamic timeout loading simulation node
    setTimeout(() => {
      setIsLoading(false);

      // Demo portfolio bypass credentials (Allows any valid layout format)
      toast.add({
        title: "Welcome Back!",
        description: "Portfolio simulator authorized successfully.",
        type: "success",
      });

      router.push("/dashboard");
    }, 1500);
  };

  // 🚀 Mock OAuth simulation logic
  const handleMockOAuth = (provider: "Google" | "GitHub") => {
    setIsLoading(true);
    setAuthError(null);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.add({
        title: `Connected with ${provider}`,
        description: "Authenticated successfully via demo pipeline.",
        type: "success",
      });
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#08080a] p-6 text-[#f4f4f6]">
      {/* Dynamic Cyber Backdrop Circle Mesh */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full opacity-25 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #00f2fe 0%, #7928ca 100%)",
        }}
      />

      <div className="relative w-full max-w-md space-y-6 rounded-2xl border border-[#29293a] bg-[#0f0f14] p-8 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#00f2fe]/10 text-[#00f2fe] mb-3">
            <Sparkles className="size-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#f4f4f6]">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-[#a0a0b2]">
            Enter your credentials to access your account
          </p>
        </div>

        {authError && (
          <div className="flex items-center gap-3 rounded-lg border border-red-500/20 bg-red-500/10 p-3.5 text-xs text-red-400">
            <AlertCircle className="size-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleMockOAuth("Google")}
            className="border-[#29293a] bg-[#171720] text-[#f4f4f6] hover:bg-[#20202d] hover:text-white"
          >
            Google
          </Button>

          <Button
            type="button"
            variant="outline"
            disabled={isLoading}
            onClick={() => handleMockOAuth("GitHub")}
            className="border-[#29293a] bg-[#171720] text-[#f4f4f6] hover:bg-[#20202d] hover:text-white"
          >
            GitHub
          </Button>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[#29293a]" />
          <span className="absolute bg-[#0f0f14] px-3 text-[11px] font-medium uppercase tracking-wider text-[#69697e]">
            Or continue with
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium uppercase tracking-wider text-[#a0a0b2]">
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
            {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-medium uppercase tracking-wider text-[#a0a0b2]">
                Password
              </label>
              <Link href="#" className="text-xs text-[#00f2fe] hover:underline">
                Forgot password?
              </Link>
            </div>
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
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-[#f4f4f6] text-[#08080a] font-medium hover:bg-white transition-all shadow-[0_0_20px_-3px_rgba(0,242,254,0.25)] mt-2"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="size-4 animate-spin" /> Signing in...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Sign In <ArrowRight className="size-4" />
              </span>
            )}
          </Button>
        </form>

        <p className="text-center text-xs text-[#a0a0b2]">
          Dont have an account?{" "}
          <Link href="/signup" className="text-[#00f2fe] hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
