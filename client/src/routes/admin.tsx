import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import AdminLayout from "@/components/layout/admin/AdminLayout";

import { profileQueryOptions } from "@/services/profile/profile.hooks";
import { queryClient } from "@/services/provider";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    try {
      const data = await queryClient.ensureQueryData(profileQueryOptions);
      if (!data) {
        throw new Error("Not logged in");
      }
    } catch {
      throw redirect({ to: "/signin" });
    }
  },
  component: () => (
    <>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </>
  ),
});
