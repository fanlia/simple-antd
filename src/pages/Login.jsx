
import { useState } from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { App, Space, Button, Checkbox, Form, Input } from 'antd';
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import Loading from '../Loading'

import { logo, title } from '../config'
import { useAuth } from '../services/login'

export default function Login () {
  const [loginType, setLoginType] = useState('account')
  const location = useLocation()
  const navigate = useNavigate()
  const { message } = App.useApp()
  const auth = useAuth()

  if (auth.status === 'checking') return <Loading />
  if (auth.status === 'checked') return <Navigate to='/' />

  const handleLogin = async (data) => {
    const signData = { ...data, loginType }
    try {
      await auth.auth.login(signData)
      const to = new URLSearchParams(location.search).get('redirect') || '/'
      navigate(to)
    } catch (e) {
      message.warning('登录失败，请重新输入！')
    }
  }
  return (auth.status === 'unchecked' &&
    <div
      style={{
        maxWidth: 400,
        margin: '0 auto',
      }}
    >
    <h2 style={{textAlign: 'center'}}>
      <Space>
        <img src={logo} alt={title} />
        <span>{title}</span>
      </Space> 
    </h2>
    <Form
      initialValues={{
        autoLogin: true,
      }}
      onFinish={handleLogin}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名: admin" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="密码: 123"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="autoLogin" valuePropName="checked" noStyle>
          <Checkbox>自动登录</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}
