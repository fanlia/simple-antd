
import { useState, useEffect } from 'react'
import { Button, Form, Input, InputNumber, Select, Space, Switch, Divider, message } from 'antd'

import * as storage from '../services/storage'

import { testProxy } from '../services/proxy'

export default () => {
  const [isAuth, setIsAuth] = useState(false)
  const [ form ] = Form.useForm()
  const options = storage.get('proxy') || {
    protocol: 'http',
  }

  const onFinish = (values) => {
    storage.set('proxy', values)
    message.success('提交成功')
  }

  const handleTest = async (e) => {
    const proxy = form.getFieldsValue()

    const res = await testProxy(proxy)
    if (res.data.page) {
      message.success('代理服务器正常')
    } else {
      message.error('代理服务器异常')
    }
  }

  return (
    <>
    <Divider>代理服务器</Divider>
    <Form
      form={form}
      initialValues={options}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      labelCol={{ span: 8 }}
      name='proxy'
    >
      <Form.Item label='协议' name='protocol' rules={[{ required: true }]}>
      <Select options={[{value: 'http', label: 'http'}, {value: 'https', label: 'https'}]} />
      </Form.Item>
      <Form.Item label='主机' name='host' rules={[{ required: true }]}><Input placeholder='127.0.0.1' /></Form.Item>
      <Form.Item label='端口' name='port' rules={[{ required: true }]}><InputNumber placeholder={3128} /></Form.Item>
      <Form.Item label='启用验证'>
      <Switch checked={isAuth} onChange={setIsAuth} />
      </Form.Item>
      {isAuth && <>
        <Form.Item label='用户名' name={['auth', 'username']}><Input /></Form.Item>
        <Form.Item label='密码' name={['auth', 'password']}><Input.Password /></Form.Item>
      </>}
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Space>
          <Button type='primary' htmlType='submit'>提交</Button>
          <Button onClick={handleTest}>测试代理是否可用</Button>
        </Space>
      </Form.Item>
    </Form>
    </>
  )
}
