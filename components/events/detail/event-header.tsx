
interface EventHeaderProps {
  event: {
    title: string;
    imageUrl?: string | null;
    shortDescription?: string | null;
    category?: { name: string } | null;
  };
}

export function EventHeader({ event }: EventHeaderProps) {
  const defaultImage =
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop";

  return (
    <div className="space-y-6">
      <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 shadow-sm">
        <img
          src={event.imageUrl || defaultImage}
          alt={event.title}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = defaultImage;
          }}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
        {event.category && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white backdrop-blur-md">
              {event.category.name}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          {event.title}
        </h1>
        {event.shortDescription && (
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
            {event.shortDescription}
          </p>
        )}
      </div>
    </div>
  );
}
