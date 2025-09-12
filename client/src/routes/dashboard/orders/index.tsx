import DashboardOrdersPage from "@/modules/dashboard/orders";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/dashboard/orders/")({
  component: DashboardOrdersPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "User Account" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Order History", isCurrent: true },
    ],
  },
});
