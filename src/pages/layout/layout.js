import { AreaChartOutlined, BookOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./layout.css";
import "react-toastify/dist/ReactToastify.css";

const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/", <AreaChartOutlined />),
  getItem("Category", "/category", <BookOutlined />),
];

const AuthenticatedLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const menuClickHandler = ({ key }) => {
    navigate(key);
  };
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          onClick={menuClickHandler}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        ></Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            <Outlet />
            {children}
            <ToastContainer />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2022 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

AuthenticatedLayout.propTypes = {
  children: PropTypes.element,
};

export default AuthenticatedLayout;
