
import { useState } from 'react'
import { Row, Col, Space, Radio, Input, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { downloadXLSX } from '../services/xlsx.js'
import NewsTitle from './NewsTitle'

export default ({ configs }) => {

  const [span, setSpan] = useState(12)
  const [keyword, setKeyword] = useState('')
  const [datas, setDatas] = useState([])

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

  const onData = (data) => {
    console.log('onData', data)
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
    </Space>
    <Row gutter={[16, 16]}>
      {configs.map((d, i) => <Col span={span} key={i}><NewsTitle config={d} keyword={keyword} onData={onData}/></Col>)}
    </Row>
    </>
  )
}
