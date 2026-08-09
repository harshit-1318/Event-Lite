import { LoginForm } from "@/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In — EventElite",
  description: "Sign in to access your student, faculty, or administrator event dashboard.",
};

export default function LoginPage() {
  return <LoginForm />;
}
