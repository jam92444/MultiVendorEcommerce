import React, { useContext, useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  DashboardOutlined,
  UnorderedListOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme, Grid, Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import "../Styles/components/_Dashboardnav.scss";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const DashboardNav = ({ children }) => {
  const { user, logout } = useContext(AppContext);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const breadCrumdata = location.pathname.split("/").filter(Boolean);

  useEffect(() => {
    setCollapsed(!screens.md);
  }, [screens.md]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: "/admin/dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/admin/dashboard/addUser",
      icon: <PlusOutlined />,
      label: "Add User",
    },
    {
      key: "/admin/dashboard/all-users",
      icon: <UnorderedListOutlined />,
      label: "List Users",
    },
    {
      key: "/admin/dashboard/all-vendors",
      icon: <UnorderedListOutlined />,
      label: "List Vendors",
    },
  ];

  const onMenuClick = ({ key }) => {
    navigate(key);
  };

  const headerTitle =
    user?.role === "admin" ? "Admin Dashboard" : "Seller Dashboard";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout className="dashboard-layout container">
      <Header className="dashboard-header">
        <div className="header-left">
          {!screens.md && (
            <div
              className="menu-toggle-icon"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          )}
          <p className="header-title">{headerTitle}</p>
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
          style={{ background: colorBgContainer }}
        >
          <Menu
            mode="inline"
            onClick={onMenuClick}
            style={{ height: "100%", borderRight: 0 }}
            items={menuItems}
          />
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            className="dashboard-breadcrumb"
            items={breadCrumdata.map((item) => ({
              title: item.charAt(0).toUpperCase() + item.slice(1),
            }))}
          />
          <Content
            className="dashboard-content"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default React.memo(DashboardNav);
