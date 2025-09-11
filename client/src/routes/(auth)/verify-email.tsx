import Layout from "@/components/layout";
import BreadCrumpComp from "@/components/layout/BreadCrumpComp";
import VerifyEmailPage from "@/modules/auth/verify-email";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/(auth)/verify-email")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumpComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "User Account" },
          { label: "Sign up", href: "/signup" },
          { label: "Verify Email", isCurrent: true },
        ]}
      />
      <VerifyEmailPage />
    </Layout>
  );
}
