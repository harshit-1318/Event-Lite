"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, type EventInput } from "@/lib/validations/event.schema";
import { createEventAction, updateEventAction } from "@/actions/event.actions";
import { EventFormFields } from "./event-form-fields";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { EventStatus } from "@prisma/client";

interface EventFormProps {
  categories: Array<{ id: string; name: string }>;
  initialData?: any;
}

export function EventForm({ categories, initialData }: EventFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: initialData || {
      title: "",
      categoryId: categories[0]?.id || "",
      description: "",
      shortDescription: "",
      venue: "",
      startDate: new Date().toISOString().split("T")[0],
      endDate: new Date().toISOString().split("T")[0],
      time: "10:00 AM – 04:00 PM",
      fee: 0,
      capacity: 100,
      imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000",
      status: EventStatus.PUBLISHED,
    },
  });

  const onSubmit = async (data: EventInput) => {
    setIsLoading(true);
    try {
      const res = initialData?.id
        ? await updateEventAction(initialData.id, data)
        : await createEventAction(data);

      if (res.success) {
        toast.success(res.message);
        router.push("/dashboard/faculty");
        router.refresh();
      } else {
        toast.error(res.message || "Failed.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <EventFormFields register={register} errors={errors} categories={categories} isLoading={isLoading} />
      <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-11 px-6">
        {isLoading ? <><Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Saving Event...</> : <><Sparkles className="w-4 h-4 mr-1.5" /> {initialData?.id ? "Update Event" : "Publish Event"}</>}
      </Button>
    </form>
  );
}
