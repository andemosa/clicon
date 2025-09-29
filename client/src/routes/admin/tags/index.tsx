import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import AdminTagsPage from '@/modules/admin/tags'

export const Route = createFileRoute('/admin/tags/')({
  component: AdminTagsPage,
    staticData: {
      breadcrumbs: [
        { label: "Home", href: "/", icon: <Home size={14} /> },
        { label: "Admin Account" },
        { label: "Dashboard", href: "/admin" },
        { label: "Tags", isCurrent: true },
      ],
    },
})
