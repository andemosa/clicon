import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import AdminCategoriesPage from '@/modules/admin/categories'

export const Route = createFileRoute('/admin/categories/')({
    component: AdminCategoriesPage,
      staticData: {
        breadcrumbs: [
          { label: "Home", href: "/", icon: <Home size={14} /> },
          { label: "Admin Account" },
          { label: "Dashboard", href: "/admin" },
          { label: "Categories", isCurrent: true },
        ],
      },
})

