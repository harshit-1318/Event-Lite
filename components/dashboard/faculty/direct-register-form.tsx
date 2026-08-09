"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { directRegisterSchema, type DirectRegisterInput } from "@/lib/validations/event.schema";
import { directRegisterAction } from "@/actions/event.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

interface DirectRegisterFormProps {
  events: Array<{ id: string; title: string }>;
}

export function DirectRegisterForm({ events }: DirectRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DirectRegisterInput>({
    resolver: zodResolver(directRegisterSchema),
    defaultValues: { eventId: events[0]?.id || "", emailOrRollNo: "" },
  });

  const onSubmit = async (data: DirectRegisterInput) => {
    setIsLoading(true);
    try {
      const res = await directRegisterAction(data);
      if (res.success) {
        toast.success(res.message);
        reset();
        router.refresh();
      } else {
        toast.error(res.message || "Failed.");
      }
    } catch {
      toast.error("Failed to register student.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div className="space-y-1">
        <Label className="text-xs font-semibold">Select Event</Label>
        <select disabled={isLoading} className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs" {...register("eventId")}>
          {events.map((e) => (<option key={e.id} value={e.id}>{e.title}</option>))}
        </select>
        {errors.eventId && <p className="text-[11px] text-red-500">{errors.eventId.message}</p>}
      </div>

      <div className="space-y-1">
        <Label className="text-xs font-semibold">Student Email or Roll Number</Label>
        <Input placeholder="student@eventelite.com or 2024-CS-042" disabled={isLoading} className="h-10 text-xs" {...register("emailOrRollNo")} />
        {errors.emailOrRollNo && <p className="text-[11px] text-red-500">{errors.emailOrRollNo.message}</p>}
      </div>

      <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl h-10 px-5 text-xs">
        {isLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" /> Enrolling...</> : <><UserPlus className="w-3.5 h-3.5 mr-1.5" /> Direct Register Student</>}
      </Button>
    </form>
  );
}
