
import { useState } from 'react'
import { Row, Col, Radio } from 'antd'
import NewsTitle from './NewsTitle'

export default ({ configs }) => {

  const [span, setSpan] = useState(12)

  const handleSpan = (e) => {
    setSpan(+e.target.value)
  }

  return (
    <>
    <Radio.Group defaultValue={span.toString()} size="small" onChange={handleSpan}>
      <Radio.Button value="24">1列</Radio.Button>
      <Radio.Button value="12">2列</Radio.Button>
      <Radio.Button value="8">3列</Radio.Button>
      <Radio.Button value="6">4列</Radio.Button>
    </Radio.Group>
    <Row gutter={[16, 16]}>
      {configs.map((d, i) => <Col span={span} key={i}><NewsTitle config={d} /></Col>)}
    </Row>
    </>
  )
}
