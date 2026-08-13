import { UseFormRegister, FieldErrors } from "react-hook-form";
import { type EventInput } from "@/lib/validations/event.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface EventFormFieldsProps {
  register: UseFormRegister<EventInput>;
  errors: FieldErrors<EventInput>;
  categories: Array<{ id: string; name: string }>;
  isLoading: boolean;
}

export function EventFormFields({ register, errors, categories, isLoading }: EventFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Label className="text-xs font-semibold">Event Title *</Label>
        <Input placeholder="TechVishwa 2026: AI & Web3 Hackathon" disabled={isLoading} className="h-10 text-xs" {...register("title")} />
        {errors.title && <p className="text-[11px] text-red-500">{errors.title.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Category *</Label>
          <select disabled={isLoading} className="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 text-xs" {...register("categoryId")}>
            <option value="">Select Category</option>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          {errors.categoryId && <p className="text-[11px] text-red-500">{errors.categoryId.message}</p>}
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Venue / Hall *</Label>
          <Input placeholder="Auditorium 1, Science Block" disabled={isLoading} className="h-10 text-xs" {...register("venue")} />
          {errors.venue && <p className="text-[11px] text-red-500">{errors.venue.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Start Date *</Label>
          <Input type="date" disabled={isLoading} className="h-10 text-xs" {...register("startDate")} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">End Date *</Label>
          <Input type="date" disabled={isLoading} className="h-10 text-xs" {...register("endDate")} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Daily Timing *</Label>
          <Input placeholder="09:30 AM – 04:30 PM" disabled={isLoading} className="h-10 text-xs" {...register("time")} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Registration Fee (₹) *</Label>
          <Input type="number" placeholder="0 for Free" disabled={isLoading} className="h-10 text-xs" {...register("fee", { valueAsNumber: true })} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold">Max Capacity (Seats) *</Label>
          <Input type="number" placeholder="100" disabled={isLoading} className="h-10 text-xs" {...register("capacity", { valueAsNumber: true })} />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs font-semibold">Full Event Description *</Label>
        <Textarea placeholder="Detailed agenda, rules, eligible semesters, guidelines..." disabled={isLoading} className="text-xs min-h-25" {...register("description")} />
        {errors.description && <p className="text-[11px] text-red-500">{errors.description.message}</p>}
      </div>
    </div>
  );
}
