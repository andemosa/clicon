import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";

import { profileQueryOptions } from "@/services/profile/profile.hooks";
import { queryClient } from "@/services/provider";

export const Route = createFileRoute("/dashboard")({
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
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </>
  ),
});
