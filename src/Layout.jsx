
import { useState } from 'react'
import { Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { Avatar, Dropdown, Button, Space, Menu, Layout, theme } from 'antd'
const { Header, Footer, Sider, Content } = Layout

import Loading from './Loading'
import { useAuth } from './services/login'
import { logo, title, menu } from './config'

export default function MyLayout () {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  const auth = useAuth()
  const {
    token: { colorBgContainer },
  } = theme.useToken()

  if (auth.status === 'checking') return <Loading />
  if (auth.status === 'unchecked') {
    const from = encodeURIComponent(location.pathname + location.search)
    const to = `/login?redirect=${from}`
    return <Navigate to={to} />
  }

  const user = auth.auth.getUser()

  const handleAvatar = async ({ key }) => {
    if (key === 'logout') {
      await auth.auth.logout()
      navigate('/login')
    }
  }

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
            display: 'flex',
            justifyContent: 'space-between',
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
          { user && <Dropdown
            menu={{
              items: [
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                },
              ],
              onClick: handleAvatar,
            }}
          >
            <Space
              style={{
                marginRight: 24,
              }}
            >
              <Avatar
                src={user.avatar}
                icon={!user.avatar && <UserOutlined />}
              />
              <span>{user.username}</span>
            </Space>
          </Dropdown>}
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
