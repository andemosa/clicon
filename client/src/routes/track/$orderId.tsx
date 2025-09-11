import Layout from "@/components/layout";
import BreadCrumpComp from "@/components/layout/BreadCrumpComp";
import TrackOrderDetailsPage from "@/modules/track/Details";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/track/$orderId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <BreadCrumpComp
        items={[
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "Track Order", href: "/track" },
          { label: "Details", isCurrent: true },
        ]}
      />
      <TrackOrderDetailsPage />
    </Layout>
  );
}
