import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import AdminCategoryProductsPage from '@/modules/admin/categories/products'

export const Route = createFileRoute('/admin/categories/$slug/products')({
  component: AdminCategoryProductsPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", href: "/admin" },
      { label: "Categories", href: "/admin/categories" },
      { label: "Category Products", isCurrent: true },
    ],
  },
})
