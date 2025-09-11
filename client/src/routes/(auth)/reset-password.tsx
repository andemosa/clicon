import Layout from "@/components/layout";
import BreadCrumpComp from "@/components/layout/BreadCrumpComp";
import ResetPasswordPage from "@/modules/auth/reset-password";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/(auth)/reset-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumpComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "User Account" },
          { label: "Sign in", href: "/signin" },
          { label: "Forgot Password", href: "/forgot-password" },
          { label: "Reset Password", isCurrent: true },
        ]}
      />
      <ResetPasswordPage />
    </Layout>
  );
}
