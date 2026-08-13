"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth.schema";
import { loginAction } from "@/actions/auth.actions";
import { QuickDevCredentials } from "./subcomponents/quick-dev-credentials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginInput>({
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
        router.push(role === "ADMIN" ? "/dashboard/admin" : role === "FACULTY" ? "/dashboard/faculty" : "/dashboard/student");
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
    <div className="space-y-5">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Welcome back</h2>
        <p className="text-xs text-slate-400">Sign in to your Student, Faculty, or Admin account</p>
      </div>

      <QuickDevCredentials onSelect={(e, p) => { setValue("email", e, { shouldValidate: true }); setValue("password", p, { shouldValidate: true }); }} />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email</Label>
          <Input type="email" placeholder="student@eventelite.com" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("email")} />
          {errors.email && <p className="text-[11px] text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-slate-300 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Password</Label>
            <Link href="/forgot-password" className="text-[11px] text-blue-400 hover:underline">Forgot?</Link>
          </div>
          <Input type="password" placeholder="••••••••" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("password")} />
          {errors.password && <p className="text-[11px] text-red-400">{errors.password.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl mt-1">
          {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Signing in...</> : <>Sign in <ArrowRight className="w-4 h-4 ml-1" /></>}
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
        Don&apos;t have an account? <Link href="/register" className="font-semibold text-blue-400 hover:underline">Register <Sparkles className="w-3 h-3 inline" /></Link>
      </div>
    </div>
  );
}
