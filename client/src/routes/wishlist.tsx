import Layout from "@/components/layout";
import BreadCrumbComp from "@/components/layout/BreadCrumbComp";
import WishlistPage from "@/modules/wishlist";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumbComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "Wishlist", isCurrent: true },
        ]}
      />
      <WishlistPage />
    </Layout>
  );
}
