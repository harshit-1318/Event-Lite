"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth.schema";
import { registerAction } from "@/actions/auth.actions";
import { RegisterFormFields } from "./register-form-fields";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "", rollNo: "", studentClass: "", department: "Computer Science" },
  });

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true);
    try {
      const res = await registerAction(data);
      if (res.success) {
        toast.success(res.message || "Registered successfully!");
        router.push("/login");
      } else {
        toast.error(res.message || "Registration failed.");
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
        <h2 className="text-2xl font-bold tracking-tight text-white">Student Registration</h2>
        <p className="text-xs text-slate-400">Create an account to enroll in campus events & workshops</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <RegisterFormFields register={register} errors={errors} isLoading={isLoading} />
        <Button type="submit" disabled={isLoading} className="w-full h-11 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl mt-2">
          {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Creating Account...</> : <>Complete Registration <ArrowRight className="w-4 h-4 ml-1" /></>}
        </Button>
      </form>

      <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
        Already have an account? <Link href="/login" className="font-semibold text-blue-400 hover:underline">Sign in</Link>
      </div>
    </div>
  );
}
