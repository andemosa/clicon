import DashboardPage from "@/modules/dashboard";
import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "User Account" },
      { label: "Dashboard", isCurrent: true },
    ],
  },
});
