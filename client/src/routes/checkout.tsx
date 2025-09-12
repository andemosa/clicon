import Layout from "@/components/layout";
import BreadCrumbComp from "@/components/layout/BreadCrumbComp";
import CheckoutPage from "@/modules/checkout";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumbComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", isCurrent: true },
        ]}
      />
      <CheckoutPage />
    </Layout>
  );
}
