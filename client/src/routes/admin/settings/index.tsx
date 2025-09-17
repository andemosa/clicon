import { createFileRoute } from '@tanstack/react-router'
import { Home } from 'lucide-react'

import AdminSettingsPage from '@/modules/admin/settings'

export const Route = createFileRoute('/admin/settings/')({
  component: AdminSettingsPage,
    staticData: {
      breadcrumbs: [
        { label: "Home", href: "/", icon: <Home size={14} /> },
        { label: "Admin Account" },
        { label: "Dashboard", href: "/admin" },
        { label: "Settings", isCurrent: true },
      ],
    },
})

