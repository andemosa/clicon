import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import AdminOrdersPage from '@/modules/admin/orders'

export const Route = createFileRoute('/admin/orders/')({
  component: AdminOrdersPage,
    staticData: {
      breadcrumbs: [
        { label: "Home", href: "/", icon: <Home size={14} /> },
        { label: "Admin Account" },
        { label: "Dashboard", href: "/admin" },
        { label: "Orders", isCurrent: true },
      ],
    },
})

