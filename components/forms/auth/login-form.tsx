"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { loginAction } from "@/actions/auth.actions";
import { LoginFormFields } from "./subcomponents/login-form-fields";
import { SSOLoginButton } from "./subcomponents/sso-login-button";
import { AuthDivider } from "./subcomponents/auth-divider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const res = await loginAction(data);
      if (res.success) {
        toast.success(res.message || "Logged in successfully!");
        const role = res.data?.role;
        router.push(
          role === "ADMIN" ? "/dashboard/admin" :
          role === "FACULTY" ? "/dashboard/faculty" :
          "/dashboard/student"
        );
        router.refresh();
      } else {
        toast.error(res.message || "Login failed.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <SSOLoginButton />
      <AuthDivider />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <LoginFormFields register={register} errors={errors} isLoading={isLoading} />
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10.5 bg-linear-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-md shadow-blue-600/25 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
        >
          {isLoading ? (
            <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Authenticating Session...</>
          ) : (
            <span className="flex items-center justify-center gap-1.5">
              Sign in to Portal <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-slate-200/90 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
          Create Account <Sparkles className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
