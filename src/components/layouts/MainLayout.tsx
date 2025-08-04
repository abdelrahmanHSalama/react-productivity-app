import { Layout } from 'antd'
import { Outlet } from 'react-router'
import { Header, Sidebar } from '../ui'
import { useAuth0 } from '@auth0/auth0-react'
import Home from '@/pages/Home'

const { Content } = Layout

export const MainLayout: React.FC = () => {
  const { isAuthenticated } = useAuth0()
  return isAuthenticated ? (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ marginInline: '1rem' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  ) : (
    <Layout className="h-screen">
      <Home />
    </Layout>
  )
}
