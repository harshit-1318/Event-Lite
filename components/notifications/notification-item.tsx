"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Bell, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: {
    id: string;
    title: string;
    message: string;
    type: string;
    isRead: boolean;
    link?: string | null;
    createdAt: Date | string;
  };
  onMarkRead?: (id: string) => void;
}

export function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "REGISTRATION_CONFIRMATION":
        return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
      case "EVENT_UPDATE":
        return <Calendar className="h-4 w-4 text-indigo-400" />;
      case "ADMIN_ALERT":
        return <AlertCircle className="h-4 w-4 text-rose-400" />;
      default:
        return <Bell className="h-4 w-4 text-primary" />;
    }
  };

  const content = (
    <div
      className={cn(
        "flex items-start gap-3 p-3 text-sm transition-colors rounded-lg hover:bg-muted/50 cursor-pointer",
        !notification.isRead && "bg-muted/20 border-l-2 border-primary"
      )}
      onClick={() => !notification.isRead && onMarkRead?.(notification.id)}
    >
      <div className="mt-0.5 shrink-0">{getIcon(notification.type)}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-foreground text-xs">{notification.title}</p>
          <span className="text-[10px] text-muted-foreground">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{notification.message}</p>
      </div>
    </div>
  );

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>;
  }

  return content;
}
