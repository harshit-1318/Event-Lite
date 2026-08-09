import { ForgotPasswordForm } from "@/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password — EventElite",
  description: "Reset your EventElite account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
