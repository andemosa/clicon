import Layout from "@/components/layout";
import BreadCrumbComp from "@/components/layout/BreadCrumbComp";
import CartPage from "@/modules/cart";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/cart")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumbComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "Cart", isCurrent: true },
        ]}
      />
      <CartPage />
    </Layout>
  );
}
