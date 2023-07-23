
import { useState, useEffect } from 'react'
import { Button, DatePicker, Space, Result } from 'antd'
import { Link } from 'react-router-dom'

import NewsTitleList from '../components/NewsTitleList'
import * as storage from '../services/storage'

export default () => {
  const [sites, setSites] = useState([])

  useEffect(() => {
    const data = storage.get('sites')
    if (data) {
      setSites(data.filter(d => !d.disabled))
    }
  }, [])

  return (
    <div>
      {
        sites.length > 0
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
