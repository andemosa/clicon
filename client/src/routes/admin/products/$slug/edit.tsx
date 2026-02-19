import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

import AdminEditProductPage from "@/modules/admin/products/edit";

export const Route = createFileRoute("/admin/products/$slug/edit")({
  component: AdminEditProductPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", href: "/admin" },
      { label: "Products", href: "/admin/products" },
      { label: "Edit Product", isCurrent: true },
    ],
  },
});
