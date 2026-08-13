"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RegistrationModal } from "@/components/events/registration-modal";
import { cancelRegistrationAction } from "@/actions/registration.actions";
import { toast } from "sonner";
import { Sparkles, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface EventDetailClientProps {
  event: any;
  currentUser: any;
  userRegistration: any;
}

export function EventDetailClient({ event, currentUser, userRegistration }: EventDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const router = useRouter();

  const isRegistered = !!userRegistration && userRegistration.status === "CONFIRMED";
  const isSoldOut = (event._count?.registrations ?? 0) >= event.capacity;

  const handleCancel = async () => {
    if (!confirm("Are you sure you want to cancel your registration?")) return;
    setIsCancelling(true);
    try {
      const res = await cancelRegistrationAction(userRegistration.id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to cancel registration.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <>
      <div className="space-y-2.5">
        {isRegistered ? (
          <div className="space-y-2">
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">You are registered</p>
                <p className="text-[10px] opacity-80 uppercase">Payment: {userRegistration.paymentStatus}</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isCancelling}
              className="w-full text-xs font-semibold text-red-600 hover:bg-red-50 rounded-xl h-10 border-red-200"
            >
              {isCancelling ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Cancelling...</> : <><XCircle className="w-3.5 h-3.5 mr-1" /> Cancel Registration</>}
            </Button>
          </div>
        ) : isSoldOut ? (
          <Button disabled className="w-full h-11 rounded-2xl text-sm font-bold bg-slate-200 text-slate-500">
            Sold Out (Full Capacity)
          </Button>
        ) : (
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="w-full h-11 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mr-1.5" /> Register for Event
          </Button>
        )}
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} event={event} currentUser={currentUser} />
    </>
  );
}
