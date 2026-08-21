export function AuthDivider({ text = "or continue with email" }: { text?: string }) {
  return (
    <div className="relative my-2.5">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200 dark:border-slate-800" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white dark:bg-slate-900 px-2.5 text-[9.5px] tracking-wider text-slate-500 dark:text-slate-400 font-medium">
          {text}
        </span>
      </div>
    </div>
  );
}
