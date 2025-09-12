import DashboardSettingsPage from "@/modules/dashboard/settings";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/dashboard/settings/")({
  component: DashboardSettingsPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "User Account" },
      { label: "Dashboard", href: "/dashboard" },
      { label: "Settings", isCurrent: true },
    ],
  },
});
