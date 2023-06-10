
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons'
import { Button, Space, Menu, Layout, theme } from 'antd'
const { Header, Footer, Sider, Content } = Layout

import { logo, title, menu } from './config'

export default function MyLayout () {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  const handleMenuClick = (e) => {
    navigate(e.key)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Space
          style={{
            padding: 24,
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        >
          <img src={logo} alt={title} />
          { !collapsed && <span>{title}</span> }
        </Space> 
        <Menu
          theme='light'
          mode='inline'
          defaultSelectedKeys={[ location.pathname ]}
          onClick={handleMenuClick}
          { ...menu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  )
}
