import Layout from '@/components/layout'
import Page from '@/modules/home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}