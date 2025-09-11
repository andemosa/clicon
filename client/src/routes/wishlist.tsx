import Layout from "@/components/layout";
import BreadCrumpComp from "@/components/layout/BreadCrumpComp";
import WishlistPage from "@/modules/wishlist";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/wishlist")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumpComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "Wishlist", isCurrent: true },
        ]}
      />
      <WishlistPage />
    </Layout>
  );
}
