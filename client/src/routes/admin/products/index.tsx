import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import AdminProductsPage from '@/modules/admin/products'

export const Route = createFileRoute('/admin/products/')({
  component: AdminProductsPage,
    staticData: {
      breadcrumbs: [
        { label: "Home", href: "/", icon: <Home size={14} /> },
        { label: "Admin Account" },
        { label: "Dashboard", href: "/admin" },
        { label: "Products", isCurrent: true },
      ],
    },
})
