import Layout from "@/components/layout";
import BreadCrumpComp from "@/components/layout/BreadCrumpComp";
import SignupPage from "@/modules/auth/signup";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumpComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "User Account" },
          { label: "Sign up", isCurrent: true },
        ]}
      />
      <SignupPage />
    </Layout>
  );
}
