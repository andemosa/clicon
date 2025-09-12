import DashboardHistoryPage from "@/modules/dashboard/history";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/dashboard/history/")({
  component: DashboardHistoryPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "User Account" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Browsing History", isCurrent: true },
    ],
  },
});
