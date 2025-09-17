import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

import AdminDashboardPage from "@/modules/admin";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", isCurrent: true },
    ],
  },
});
