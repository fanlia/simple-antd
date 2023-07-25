
import { Typography } from 'antd'

const { Text } = Typography

export default ({ title, keyword }) => {
  if (!keyword) return title

  const parts = title.split(keyword)
  const elements = parts.slice(0, -1)
    .map((d, i) => [{ type: 'normal', value: d }, { type: 'highlight', value: keyword }]).flat()
    .concat({type: 'normal', value: parts[parts.length - 1]})

  return elements.map((d, i) => d.type === 'highlight' ? <Text mark key={i}>{d.value}</Text> : <Text key={i}>{d.value}</Text>)
}
