import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

import AdminEditCategoryPage from "@/modules/admin/categories/edit";

export const Route = createFileRoute('/admin/categories/$slug/edit')({
  component: AdminEditCategoryPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", href: "/admin" },
      { label: "Categories", href: "/admin/categories" },
      { label: "Edit Category", isCurrent: true },
    ],
  },
})

