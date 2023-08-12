
import { useState } from 'react'
import { Row, Col, Space, Radio, Input, Button, Switch } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { downloadXLSX } from '../services/xlsx.js'
import NewsTitle from './NewsTitle'

import * as storage from '../services/storage'

import { sendMail } from '../services/email'

export default ({ configs }) => {

  const [span, setSpan] = useState(12)
  const [keyword, setKeyword] = useState('')
  const [datas, setDatas] = useState([])
  const [alertEmail, setAlertEmail] = useState(false)

  const disableEmailOptions = !storage.get('mail-options')

  const handleSpan = (e) => {
    setSpan(+e.target.value)
  }

  const handleKeyword = (e) => {
    const keyword = e.target.value.trim()
    setKeyword(keyword)
  }

  const handleDownload = () => {
    const list  = datas.map(data => data.list.filter(d => d.title.includes(keyword))).flat()
    downloadXLSX(list, '全部')
  }

  const handleAlert = async (data, oldData) => {
    try {
      if (data.site !== oldData.site) {
        return
      }
      if (oldData.list.length === 0) {
        return
      }
      const oldlistByUrl = oldData.list.reduce((m, d) => ({ ...m, [d.url]: true }), {})
      const newDataList = data.list.filter(d => !oldlistByUrl[d.url])

      if (newDataList.length === 0) {
        return
      }

      const options = storage.get('mail-options')
      if (!options) {
        return
      }

      const style = 'style="border: 1px solid #000000;"'

      const thead = `<tr><td ${style}>时间</td><td ${style}>标题</td><td ${style}>链接</td></tr>`
      const tbody = newDataList.map(d => `<tr><td ${style}>${d.date}</td><td ${style}>${d.title}</td><td ${style}>${d.url}</td></tr>`).join('')
      const html = `<table style="border-collapse: collapse;border: 1px solid #000000;"><thead>${thead}</thead><tbody>${tbody}</tbody></table>`

      const mail = {
        from: options.auth.user,
        to: options.auth.user,
        subject: data.site,
        html,
      }

      const variables = {
        options: {
          port: 465,
          secure: true,
          ...options,
        },
        mail,
      }

      const res = await sendMail(variables)

      if (!res.data.send_mail) {
        console.log(res)
      }

    } catch (e) {
      console.log('alert error', e)
    }
  }

  const onData = (data, oldData) => {
    if (alertEmail) {
      handleAlert(data, oldData)
    }
    setDatas(datas => [...datas.filter(d => d.site !== data.site), data])
  }

  return (
    <>
    <Space>
      <Radio.Group defaultValue={span.toString()} onChange={handleSpan}>
        <Radio.Button value="24">1列</Radio.Button>
        <Radio.Button value="12">2列</Radio.Button>
        <Radio.Button value="8">3列</Radio.Button>
        <Radio.Button value="6">4列</Radio.Button>
      </Radio.Group>
      <Input addonBefore={<SearchOutlined />} allowClear placeholder="关键字" onChange={handleKeyword} />
      <Button onClick={handleDownload}>下载全部</Button>
      <Switch checked={alertEmail} onChange={setAlertEmail} checkedChildren='关闭邮件通知' unCheckedChildren='开启邮件通知' disabled={disableEmailOptions} />
    </Space>
    <Row gutter={[16, 16]}>
      {configs.map((d, i) => <Col span={span} key={i}><NewsTitle config={d} keyword={keyword} onData={onData}/></Col>)}
    </Row>
    </>
  )
}
