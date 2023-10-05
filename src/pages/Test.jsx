
import { useState, useEffect } from 'react'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'
import { Button, message, Upload, Space, Table, Divider, Tag } from 'antd'

import * as storage from '../services/storage'
import * as xlsx from '../services/xlsx'

import { SITES } from '../sites/index'

export default () => {

  const [sites, setSites] = useState([])
  const [file, setFile] = useState(null)

  useEffect(() => {
    const data = storage.get('sites', SITES)
    if (data) {
      setSites(data)
    }
  }, [])

  const handleImport = async (e) => {
    if (!e.file) return
    const data = await xlsx.readFile(e.file)
    storage.set('sites', data)
    setSites(data)
  }

  const handleExport = () => {
    xlsx.downloadXLSX(sites, '站点信息')
  }

  const handleDisabled = (page, disabled) => {
    const newdata = sites.map(d => {
      return d.page !== page ? d : { ...d, disabled }
    })
    storage.set('sites', newdata)
    setSites(newdata)
  }

  const columns = [
    {
      title: '网址',
      dataIndex: 'page',
      key: 'page',
      render: (page, d) => <a href={page} target='_blank'>{d.name || page}</a>
    },
    {
      title: '是否启用',
      dataIndex: 'disabled',
      key: 'disabled',
      width: 150,
      render: (disabled) => disabled ? <Tag color='volcano'>已禁用</Tag> : <Tag color='green'>已启用</Tag> 
    },
    {
      title: '操作',
      key: 'action',
      render: (_, d) => <Space>
        {
          d.disabled ? <Button onClick={() => handleDisabled(d.page, false)}>启用</Button> : <Button onClick={() => handleDisabled(d.page, true)}>禁用</Button>
        }
      </Space>,
    },
  ]

  return (
    <div>
      <Space>
        <Upload onChange={handleImport} beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>上传站点文件</Button>
        </Upload>
        <Button icon={<DownloadOutlined />} onClick={handleExport}>下载站点文件</Button>
      </Space>
      <Divider>网站</Divider>
      <Table dataSource={sites} columns={columns} rowKey='page' size='small'/>
    </div>
  )
}
