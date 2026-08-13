"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth.schema";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Mail, ArrowLeft, Send } from "lucide-react";
import Link from "next/link";

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [devResetToken, setDevResetToken] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    try {
      const res = await forgotPasswordAction(data);
      if (res.success) {
        setSubmittedEmail(data.email);
        if (res.data?.token) setDevResetToken(res.data.token);
        toast.success(res.message || "Reset link sent.");
      } else {
        toast.error(res.message || "Failed.");
      }
    } catch {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  if (submittedEmail) {
    return (
      <div className="space-y-4 text-center">
        <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto"><Mail className="w-5 h-5" /></div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white">Check your email</h3>
          <p className="text-xs text-slate-300">We sent a reset link to <strong className="text-blue-400">{submittedEmail}</strong></p>
        </div>
        {devResetToken && (
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left text-xs">
            <span className="font-bold text-amber-400">Dev Shortcut:</span>{" "}
            <Link href={`/reset-password?token=${devResetToken}`} className="text-amber-300 underline break-all">/reset-password?token={devResetToken}</Link>
          </div>
        )}
        <div className="pt-2 border-t border-slate-800"><Link href="/login" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back to Login</Link></div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="space-y-1 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-white">Forgot Password</h2>
        <p className="text-xs text-slate-400">Enter your email to receive a password reset link.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Account Email</Label>
          <Input type="email" placeholder="student@eventelite.com" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("email")} />
          {errors.email && <p className="text-[11px] text-red-400">{errors.email.message}</p>}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl">
          {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-1" /> Sending...</> : <>Send Reset Link <Send className="w-3.5 h-3.5 ml-1" /></>}
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-slate-800">
        <Link href="/login" className="text-xs text-slate-400 hover:text-white inline-flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> Back to Login</Link>
      </div>
    </div>
  );
}
