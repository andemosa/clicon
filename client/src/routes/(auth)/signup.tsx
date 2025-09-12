import Layout from "@/components/layout";
import BreadCrumbComp from "@/components/layout/BreadCrumbComp";
import SignupPage from "@/modules/auth/signup";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/(auth)/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumbComp
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
