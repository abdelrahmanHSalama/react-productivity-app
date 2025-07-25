import { Layout } from 'antd'
import { Outlet } from 'react-router'
import { Header, Sidebar } from '../ui'
// import Sidebar from './Sidebar'
// import Header from './Header'

const { Content } = Layout

export const MainLayout: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <Header />
        <Content style={{ marginInline: '1rem' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
