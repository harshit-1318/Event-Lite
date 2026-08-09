"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileUpdateSchema, type ProfileUpdateInput } from "@/lib/validations/auth.schema";
import { updateProfileAction } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface ProfileFormProps {
  user: any;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileUpdateInput>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      department: user.department || "",
      rollNo: user.rollNo || "",
      studentClass: user.studentClass || "",
      fatherName: user.fatherName || "",
    },
  });

  const onSubmit = async (data: ProfileUpdateInput) => {
    setIsLoading(true);
    try {
      const res = await updateProfileAction(data);
      if (res.success) {
        toast.success(res.message || "Profile updated successfully!");
      } else {
        toast.error(res.message || "Failed to update profile.");
      }
    } catch {
      toast.error("An error occurred while updating profile.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl">
      <div className="space-y-1">
        <Label className="text-xs">Full Name</Label>
        <Input {...register("name")} disabled={isLoading} className="h-10 text-xs" />
        {errors.name && <p className="text-[11px] text-red-500">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Email Address (Read-only)</Label>
        <Input value={user.email} disabled className="h-10 text-xs bg-slate-100 dark:bg-slate-800 opacity-70" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Roll Number</Label>
          <Input {...register("rollNo")} disabled={isLoading} className="h-10 text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Class / Semester</Label>
          <Input {...register("studentClass")} disabled={isLoading} className="h-10 text-xs" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Department</Label>
          <Input {...register("department")} disabled={isLoading} className="h-10 text-xs" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Phone Number</Label>
          <Input {...register("phone")} disabled={isLoading} className="h-10 text-xs" />
        </div>
      </div>

      <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl h-10 px-5">
        {isLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> Saving Changes...</> : <><Save className="w-3.5 h-3.5 mr-1.5" /> Save Profile</>}
      </Button>
    </form>
  );
}
