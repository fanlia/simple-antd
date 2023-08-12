
import { useState, useEffect } from 'react'
import { Button, Form, Input, Space, message } from 'antd'

import * as storage from '../services/storage'

import { sendMail } from '../services/email'

export default () => {
  const [ form ] = Form.useForm()
  const options = storage.get('mail-options') || {}

  const onFinish = (values) => {
    storage.set('mail-options', values)
    message.success('提交成功')
  }

  const handleTest = async (e) => {
    const values = form.getFieldsValue()

    const mail = {
      from: values.auth.user,
      to: values.auth.user,
      subject: "test",
      html: "this is a test email",
    }

    const variables = {
      options: {
        port: 465,
        secure: true,
        ...values,
      },
      mail,
    }

    const res = await sendMail(variables)
    if (res.send_mail) {
      message.success('测试邮件发送成功')
    } else {
      message.error('测试邮件发送失败')
    }
  }

  return (
    <Form
      form={form}
      initialValues={options}
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
      labelCol={{ span: 8 }}
    >
      <Form.Item label='SMTP' name='host' rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item label='用户名' name={['auth', 'user']} rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item label='密码' name={['auth', 'pass']} rules={[{ required: true }]}><Input.Password /></Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Space>
          <Button type='primary' htmlType='submit'>提交</Button>
          <Button onClick={handleTest}>测试发送邮件</Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
