import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import AdminTagProductsPage from '@/modules/admin/tags/products'

export const Route = createFileRoute('/admin/tags/$name/products')({
  component: AdminTagProductsPage,
  staticData: {
    breadcrumbs: [
      { label: "Home", href: "/", icon: <Home size={14} /> },
      { label: "Admin Account" },
      { label: "Dashboard", href: "/admin" },
      { label: "Tags", href: "/admin/tags" },
      { label: "Tag Products", isCurrent: true },
    ],
  },
})
