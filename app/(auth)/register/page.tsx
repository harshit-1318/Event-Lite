import { RegisterForm } from "@/components/forms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Registration — EventElite",
  description: "Create your student account to register and participate in campus events.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
