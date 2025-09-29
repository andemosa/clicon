import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

import AdminNewCategoriesPage from "@/modules/admin/categories/new";

export const Route = createFileRoute("/admin/categories/new/")({
  component: AdminNewCategoriesPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", href: "/admin" },
      { label: "Categories", href: "/admin/categories" },
      { label: "New Category", isCurrent: true },
    ],
  },
});
