import { BellOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, Layout, theme } from 'antd'

const { Header: AntHeader } = Layout

export const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  return (
    <AntHeader
      style={{
        paddingInline: '0.5rem',
        margin: '1rem',
        borderRadius: '2rem',
        background: colorBgContainer,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Input
        placeholder="Search"
        prefix={<SearchOutlined />}
        style={{
          width: '50%',
          maxWidth: '200px',
          height: '75%',
          backgroundColor: 'var(--color-background-dark)',
          border: 'none',
          borderRadius: '2rem',
        }}
      />
      <div className="flex items-center gap-2 mr-2">
        <BellOutlined className="text-xl" />
        <img src="./abdelrahman.jpg" className="rounded-full w-[2.5rem]" />
        <p>Abdelrahman</p>
      </div>
    </AntHeader>
  )
}
