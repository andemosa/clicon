import { createFileRoute } from "@tanstack/react-router";
import { Home } from "lucide-react";

import AdminNewProductsPage from "@/modules/admin/products/new";

export const Route = createFileRoute("/admin/products/new/")({
  component: AdminNewProductsPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", href: "/admin" },
      { label: "Products", href: "/admin/products" },
      { label: "New Product", isCurrent: true },
    ],
  },
});
