
import { useState, useEffect } from 'react'
import * as storage from '../services/storage'

import { Button, Form, Input, message } from 'antd'

export default () => {
  const options = storage.get('mail-options') || {}

  const onFinish = (values) => {
    storage.set('mail-options', values)
    message.success('提交成功')
  }

  return (
    <Form
      initialValues={options}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      labelCol={{ span: 8 }}
    >
      <Form.Item label='SMTP' name='host' rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item label='用户名' name={['auth', 'user']} rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item label='密码' name={['auth', 'pass']} rules={[{ required: true }]}><Input.Password /></Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type='primary' htmlType='submit'>提交</Button>
      </Form.Item>
    </Form>
  )
}
