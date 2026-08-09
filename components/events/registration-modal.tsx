"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RegistrationModalBody } from "@/components/events/registration-modal-body";
import { registerForEventAction } from "@/actions/registration.actions";
import { toast } from "sonner";
import { Loader2, Sparkles, Ticket } from "lucide-react";
import { ParticipationStatus } from "@prisma/client";
import confetti from "canvas-confetti";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: any;
  currentUser: any;
}

export function RegistrationModal({ isOpen, onClose, event, currentUser }: RegistrationModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [participationStatus, setParticipationStatus] = useState<ParticipationStatus>(ParticipationStatus.ATTENDING);
  const router = useRouter();

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const res = await registerForEventAction({ eventId: event.id, participationStatus });
      if (res.success) {
        toast.success(res.message);
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
        onClose();
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-5 rounded-3xl">
        <DialogHeader className="space-y-1">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center mb-0.5">
            <Ticket className="w-4 h-4" />
          </div>
          <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">Confirm Registration</DialogTitle>
          <DialogDescription className="text-xs text-slate-500">Reserve your student pass for this session.</DialogDescription>
        </DialogHeader>

        {!currentUser ? (
          <div className="py-5 text-center space-y-3">
            <p className="text-xs text-slate-600">Please sign in to register for this event.</p>
            <div className="flex justify-center gap-2">
              <Link href={`/login?callbackUrl=/events/${event.slug}`}><Button size="sm">Sign In</Button></Link>
              <Link href="/register"><Button size="sm" variant="outline">Register</Button></Link>
            </div>
          </div>
        ) : (
          <>
            <RegistrationModalBody event={event} currentUser={currentUser} participationStatus={participationStatus} setParticipationStatus={setParticipationStatus} />
            <DialogFooter className="pt-2">
              <Button variant="outline" onClick={onClose} disabled={isLoading} className="rounded-xl h-9 text-xs">Cancel</Button>
              <Button onClick={handleRegister} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-9 text-xs">
                {isLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Booking...</> : <>Confirm <Sparkles className="w-3.5 h-3.5 ml-1" /></>}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
