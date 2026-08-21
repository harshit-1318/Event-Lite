"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginInput } from "@/lib/validations/auth.schema";

interface LoginFormFieldsProps {
  register: UseFormRegister<LoginInput>;
  errors: FieldErrors<LoginInput>;
  isLoading: boolean;
}

export function LoginFormFields({ register, errors, isLoading }: LoginFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-blue-500" /> Email Address
        </Label>
        <Input
          type="email"
          placeholder="e.g. yourname@gmail.com"
          disabled={isLoading}
          className="bg-slate-50/80 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 h-10 rounded-xl transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs"
          {...register("email")}
        />
        {errors.email && <p className="text-[11px] font-medium text-rose-500 pl-0.5">{errors.email.message}</p>}
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-blue-500" /> Password
          </Label>
          <Link href="/forgot-password" tabIndex={-1} className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            disabled={isLoading}
            className="bg-slate-50/80 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 text-slate-900 dark:text-white focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-blue-500 h-10 rounded-xl pr-10 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors p-1.5 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-800 cursor-pointer"
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && <p className="text-[11px] font-medium text-rose-500 pl-0.5">{errors.password.message}</p>}
      </div>

      <div className="flex items-center justify-between pt-0.5">
        <div className="flex items-center space-x-2">
          <Checkbox id="remember" className="border-slate-300 dark:border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 rounded-md" />
          <label htmlFor="remember" className="text-[11.5px] font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer select-none">
            Remember me on this device
          </label>
        </div>
      </div>
    </div>
  );
}
