
import { useState } from 'react'
import { Row, Col, Space, Radio, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import NewsTitle from './NewsTitle'

export default ({ configs }) => {

  const [span, setSpan] = useState(12)
  const [keyword, setKeyword] = useState('')

  const handleSpan = (e) => {
    setSpan(+e.target.value)
  }

  const handleKeyword = (e) => {
    const keyword = e.target.value.trim()
    setKeyword(keyword)
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
      <Input addonBefore={<SearchOutlined />} placeholder="关键字" onChange={handleKeyword} />
    </Space>
    <Row gutter={[16, 16]}>
      {configs.map((d, i) => <Col span={span} key={i}><NewsTitle config={d} keyword={keyword}/></Col>)}
    </Row>
    </>
  )
}
