import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { HeadContent } from "@tanstack/react-router";

import NotFoundPage from "@/modules/not-found";
import Layout from "@/components/layout";
import { Toaster } from "@/components/ui/toaster";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools />
    </>
  ),
  head: () => ({
    meta: [{ title: "Clicon" }, { name: "description", content: "Clicon" }],
    links: [{ rel: "icon", href: "favicon.svg" }],
  }),
  notFoundComponent: () => (
    <Layout>
      <NotFoundPage />
    </Layout>
  ),
});
