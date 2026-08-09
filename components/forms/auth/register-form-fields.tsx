import React from "react";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { type RegisterInput } from "@/lib/validations/auth.schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, GraduationCap, BookOpen } from "lucide-react";

interface RegisterFormFieldsProps {
  register: UseFormRegister<RegisterInput>;
  errors: FieldErrors<RegisterInput>;
  isLoading: boolean;
}

export function RegisterFormFields({ register, errors, isLoading }: RegisterFormFieldsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs text-slate-300 flex items-center gap-1"><User className="w-3.5 h-3.5" /> Full Name *</Label>
        <Input placeholder="Aarav Patel" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("name")} />
        {errors.name && <p className="text-[11px] text-red-400">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label className="text-xs text-slate-300 flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> Email Address *</Label>
        <Input type="email" placeholder="student@eventelite.com" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("email")} />
        {errors.email && <p className="text-[11px] text-red-400">{errors.email.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> Roll No *</Label>
          <Input placeholder="2024-CS-042" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("rollNo")} />
          {errors.rollNo && <p className="text-[11px] text-red-400">{errors.rollNo.message}</p>}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Class *</Label>
          <Input placeholder="B.Tech 6th Sem" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("studentClass")} />
          {errors.studentClass && <p className="text-[11px] text-red-400">{errors.studentClass.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1"><Lock className="w-3.5 h-3.5" /> Password *</Label>
          <Input type="password" placeholder="••••••••" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("password")} />
          {errors.password && <p className="text-[11px] text-red-400">{errors.password.message}</p>}
        </div>
        <div className="space-y-1">
          <Label className="text-xs text-slate-300 flex items-center gap-1">Confirm *</Label>
          <Input type="password" placeholder="••••••••" disabled={isLoading} className="bg-slate-800/80 border-slate-700 text-white" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-[11px] text-red-400">{errors.confirmPassword.message}</p>}
        </div>
      </div>
    </div>
  );
}
