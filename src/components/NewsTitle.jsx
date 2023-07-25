
import { useState, useEffect } from 'react'
import { Table, Divider, Button, Space } from 'antd'

import { downloadXLSX } from '../services/xlsx.js'
import SecondButton from './SecondButton'
import KeywordTitle from './KeywordTitle'

const fetchData = (variables) => {
  const url = import.meta.env.VITE_API || 'http://localhost:4000'

  const [$date, date] = variables.date ? [`$date: String!`, `date:date(selector: $date, from: "YYYY MM DD")`] : ['', '']
  const [$out_date, out_date] = variables.out_date ? [`$out_date: String!`, `date:date(selector: $out_date, from: "YYYY MM DD")`] : ['', '']

  const query = `
  query(
    $page: JSON!
    $site: String!
    $list: String!
    ${$date}
    ${$out_date}
    $title: String!
    $url: String!
  ) {
    page(url: $page) {
      site:text(selector: $site)
      ${out_date}
      list:children(selector: $list) {
        ${date}
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
      const page = res.data.page
      if (page) {
        page.list = page.list.map(d => ({ date: page.date || d.date, ...d, site: page.site }))
        setData(page)
        onData(page)
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
      render: (title, d) => <a href={d.url} target='_blank'><KeywordTitle title={title} keyword={keyword}/></a>
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
