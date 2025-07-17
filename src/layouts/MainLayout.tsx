import {
  BellOutlined,
  FileTextOutlined,
  HistoryOutlined,
  HomeOutlined,
  PieChartOutlined,
  SearchOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Layout, Menu, theme } from "antd";
import { Outlet } from "react-router";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Dashboard", "1", <HomeOutlined />),
  getItem("Analytics", "2", <PieChartOutlined />),
  getItem("History", "3", <HistoryOutlined />),
  getItem("Todo", "4", <UnorderedListOutlined />),
  getItem("Report", "5", <FileTextOutlined />),
  getItem("Settings", "6", <SettingOutlined />),
];

const MainLayout: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="light">
        <h1 className="logo">
          TASK.<span className="text-[var(--main-orange)]">ai</span>
        </h1>
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{
            paddingInline: "0.5rem",
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            paddingInline: "0.5rem",
            margin: "1rem",
            borderRadius: "2rem",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{
              width: "50%",
              maxWidth: "200px",
              height: "75%",
              backgroundColor: "var(--light-grey)",
              border: "none",
              borderRadius: "2rem",
            }}
          />
          <div className="flex items-center gap-4 mr-2">
            <BellOutlined
              style={{
                fontSize: "1.25rem",
              }}
            />
            <img
              src="https://www.rockstargames.com/img/global/downloads/buddyiconsconavatars/sanandreas_grovestreetfamily3_256x256.jpg"
              className="rounded-full w-[2.5rem]"
            />
            <p>
              Abdelrahman <DownOutlined />
            </p>
          </div>
        </Header>

        <Content style={{ padding: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
