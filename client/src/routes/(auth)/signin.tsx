import Layout from "@/components/layout";
import BreadCrumpComp from "@/components/layout/BreadCrumpComp";
import SigninPage from "@/modules/auth/signin";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/(auth)/signin")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumpComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "User Account" },
          { label: "Sign in", isCurrent: true },
        ]}
      />
      <SigninPage />
    </Layout>
  );
}
