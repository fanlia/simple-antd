
import { useState, useEffect } from 'react'
import { Table, Divider, Button, Space } from 'antd'

import { downloadXLSX } from '../services/xlsx.js'
import SecondButton from './SecondButton'

const fetchData = (variables) => {
  const url = 'http://localhost:4000'

  const query = `
  query(
    $page: JSON!
    $site: String!
    $list: String!
    $date: String!
    $title: String!
    $url: String!
  ) {
    page(url: $page) {
      site:text(selector: $site)
      list:children(selector: $list) {
        date:text(selector: $date)
        title:text(selector: $title)
        url:url(selector: $url)
      }
    }
  }
  `

  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(res => res.json())

}

export default ({ config, keyword, onData }) => {

  const [data, setData] = useState({
    title: '',
    list: [],
  })

  const [loading, setLoading] = useState(false)

  const requestData = () => {
    if (!config) return

    setLoading(true)
    fetchData(config)
    .then((res) => {
      if (res.data.page) {
        setData(res.data.page)
        onData(res.data.page)
      } else {
        console.log('error', res)
      }
      setLoading(false)
    })
  }

  useEffect(() => {
    requestData()
  }, [])

  const handleDownload = () => {
    const list  = data.list.filter(d => d.title.includes(keyword))
    downloadXLSX(list, data.site)
  }

  const handleReload = () => {
    requestData()
  }

  const onTickEnd = () => {
    requestData()
  }

  const columns = [
    {
      title: '时间',
      dataIndex: 'date',
      key: 'date',
      width: 150,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: (title, d) => <a href={d.url} target='_blank'>{title}</a>
    },
  ]

  return (
    <>
    <Divider>{data.site}</Divider>
    <div style={{marginBottom: 8}}>
      <Space>
        <Button onClick={handleDownload}>下载</Button>
        <Button onClick={handleReload}>刷新</Button>
        <SecondButton onTickEnd={onTickEnd} />
      </Space>
    </div>
    <Table dataSource={data.list.filter(d => d.title.includes(keyword))} columns={columns} rowKey='url' size='small' loading={loading}/>
    </>
  )
}
