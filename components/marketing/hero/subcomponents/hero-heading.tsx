
export function HeroHeading() {
  return (
    <div className="space-y-4">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
        Where Campus Legacy Meets{" "}
        <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent drop-shadow-xs">
          Extraordinary Events
        </span>
      </h1>
      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed font-normal">
        Experience next-gen campus life: National hackathons, youth cultural fests, sports championships, and verified digital certificates with instant QR access.
      </p>
    </div>
  );
}
