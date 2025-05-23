import React, { useContext, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Grid, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const DashboardNav = ({ children }) => {
  const { user, logout } = useContext(AppContext);
  const screens = useBreakpoint();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  React.useEffect(() => {
    if (!screens.md) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens.md]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items2 = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      children: [
        { key: "/admin/dashboard/addUser", icon: <PlusOutlined />, label: "Add User" },
        { key: "/dashboard/orders", icon: <UnorderedListOutlined />, label: "Orders" },
      ],
    },
    {
      key: "user",
      icon: <UserOutlined />,
      label: "User",
      children: [
        { key: "/user/add", icon: <PlusOutlined />, label: "Add User" },
        { key: "/user/list", icon: <UnorderedListOutlined />, label: "List Users" },
      ],
    },
    {
      key: "vendor",
      icon: <ShopOutlined />,
      label: "Vendor",
      children: [
        { key: "/vendor/add", icon: <PlusOutlined />, label: "Add Vendor" },
        { key: "/vendor/list", icon: <UnorderedListOutlined />, label: "List Vendors" },
      ],
    },
  ];

  const onMenuClick = ({ key }) => {
    navigate(key);
  };

  const headerMenuItems =
    user?.role === "admin"
      ? [{ key: "dashboard", label: "Admin Dashboard" }]
      : [{ key: "dashboard", label: "Seller Dashboard" }];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout className="container">
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          background: "#001529",
          boxShadow: "0 2px 8px #f0f1f2",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {!screens.md && (
            <div
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: 18,
                color: "#fff",
                cursor: "pointer",
                marginRight: 16,
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          )}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["dashboard"]}
            items={headerMenuItems}
            style={{ flex: 1, minWidth: 0, fontWeight: 700, fontSize: "1rem" }}
          />
        </div>

        <Button
          type="primary"
          danger
          icon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Header>
      <Layout>
        <Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="md"
          collapsedWidth={screens.md ? 80 : 0}
          style={{
            position: "sticky",
            top: 64,
            height: `calc(100vh - 64px)`,
            overflowY: "auto",
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            onClick={onMenuClick}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            items={[{ title: "Home" }, { title: "App" }]}
            style={{ margin: "16px 0" }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: "90vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflowY: "auto",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default DashboardNav;
