import DashboardLayout from "@/components/layout/dashboard/DashboardLayout";
import { profileQueryOptions } from "@/services/auth/auth.hooks";
import { queryClient } from "@/services/provider";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

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
