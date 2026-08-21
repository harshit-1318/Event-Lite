import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SSOLoginButton() {
  const handleSSOClick = () => {
    toast.info("Connecting to Institutional SSO...", {
      description: "DAV College Single Sign-On authentication gateway.",
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleSSOClick}
      className="w-full h-9 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700/80 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-xs font-medium group cursor-pointer"
    >
      <svg className="w-3.5 h-3.5 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
        <path
          fill="#EA4335"
          d="M12 5c1.56 0 2.96.57 4.07 1.5l3.05-3.05C17.26 1.7 14.8 1 12 1 7.42 1 3.52 3.6 1.63 7.37l3.66 2.84C6.17 7.22 8.84 5 12 5z"
        />
        <path
          fill="#4285F4"
          d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.66 2.84c2.14-1.98 3.76-4.9 3.76-8.66z"
        />
        <path
          fill="#FBBC05"
          d="M5.29 14.79A7.04 7.04 0 0 1 4.9 12c0-.98.17-1.92.48-2.79L1.72 6.37A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.25 5.37l4.04-2.58z"
        />
        <path
          fill="#34A853"
          d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.66-2.84c-1.08.72-2.45 1.16-4.27 1.16-3.16 0-5.83-2.22-6.71-5.21L1.63 16.04C3.52 19.81 7.42 22.41 12 23z"
        />
      </svg>
      <span>Sign in with College Google ID</span>
    </Button>
  );
}
