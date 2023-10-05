
import { useState, useEffect } from 'react'
import { Button, DatePicker, Space, Result, Spin } from 'antd'
import { Link } from 'react-router-dom'

import NewsTitleList from '../components/NewsTitleList'
import * as storage from '../services/storage'

import { SITES } from '../sites/index'

export default () => {
  const [sites, setSites] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const data = storage.get('sites', SITES)
    if (data) {
      setSites(data.filter(d => !d.disabled))
    }
    setLoaded(true)
  }, [])

  return (
    <div>
      {
      !loaded
      ? <Spin />
      :  sites.length > 0
          ? <NewsTitleList configs={sites} />
          : <Result
              status="warning"
              title="如果没有网站，世界将会怎样？"
              extra={
                <Link to='/test'>赶紧配置网站吧</Link>
              }
            />
      }
    </div>
  )
}
