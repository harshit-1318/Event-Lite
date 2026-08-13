"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth.schema";
import { resetPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ResetPasswordForm({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token, password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    try {
      const res = await resetPasswordAction(data);
      if (res.success) {
        setIsSuccess(true);
        toast.success(res.message || "Password updated!");
      } else {
        toast.error(res.message || "Failed.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="space-y-3 text-center">
        <h3 className="text-lg font-bold text-red-400">Invalid Reset Link</h3>
        <p className="text-xs text-slate-300">Missing security token.</p>
        <Link href="/forgot-password" className="text-xs text-blue-400 underline">Request new link</Link>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto"><CheckCircle2 className="w-5 h-5" /></div>
        <h3 className="text-lg font-bold text-white">Password Updated</h3>
        <p className="text-xs text-slate-300">You can now sign in with your new password.</p>
        <Button onClick={() => router.push("/login")} className="w-full bg-blue-600 hover:bg-blue-500">Sign In Now</Button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Reset Password</h2>
        <p className="text-xs text-slate-400">Enter a new secure password</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <input type="hidden" {...register("token")} value={token} />
        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> New Password</Label>
          <Input type="password" placeholder="••••••••" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("password")} />
          {errors.password && <p className="text-[11px] text-red-400">{errors.password.message}</p>}
        </div>

        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1">Confirm Password</Label>
          <Input type="password" placeholder="••••••••" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-[11px] text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl">
          {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-1" /> Updating...</> : "Update Password"}
        </Button>
      </form>
    </div>
  );
}
