import DashboardOrderPage from "@/modules/dashboard/order";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/dashboard/orders/$orderId")({
  component: DashboardOrderPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "User Account" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Order History", href: "/dashboard/orders" },
      { label: "Order Details", isCurrent: true },
    ],
  },
});
