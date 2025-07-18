import { BellOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Layout, theme } from "antd";

const { Header: AntHeader } = Layout;

const Header = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntHeader
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
    </AntHeader>
  );
};

export default Header;
