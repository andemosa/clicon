import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

import AdminUsersPage from "@/modules/admin/users";

export const Route = createFileRoute("/admin/users/")({
  component: AdminUsersPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", href: "/admin" },
      { label: "Users", isCurrent: true },
    ],
  },
});
