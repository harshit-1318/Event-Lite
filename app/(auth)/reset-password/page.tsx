import { ResetPasswordForm } from "@/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password — EventElite",
  description: "Set a new password for your EventElite account.",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token = "" } = await searchParams;
  return <ResetPasswordForm token={token} />;
}
