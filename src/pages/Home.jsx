
import { useState } from 'react'
import { Button, DatePicker, Space } from 'antd'

import NewsTitleList from '../components/NewsTitleList'

export default () => {
  const [count, setCount] = useState(0)

  const configs = [
    {
      page: 'https://www.zhjtjt.com/Project/Default.aspx?i=3&j=0',
      site: 'head title',
      list: '.safetylist li',
      date: 'span',
      title: 'a',
      url: 'a',
    },
    {
      page: 'http://zrzyj.zhuhai.gov.cn/zwgk/gggs/jzgclgs/',
      site: 'head title',
      list: '.list01 li',
      date: 'span',
      title: 'a',
      url: 'a',
    },
    {
      page: 'http://zjj.zhuhai.gov.cn/zjj/hygl/ywgsgg/spfjgbags/index.html',
      site: 'head title',
      list: '.card-deck .card',
      date: 'small',
      title: 'h5',
      url: 'a',
    },
    {
      page: 'http://www.zhxz.gov.cn/xxgk/gzjg/qzfgzbm/qjyj/tzgg/',
      site: 'head title',
      list: '.ins-con-list li',
      date: 'span',
      title: 'a',
      url: 'a',
    },
    {
      page: 'https://www.zhjtjt.com/Project/propublic.aspx?i=3&j=4',
      site: 'head title',
      list: '.infopubList li',
      date: '.infopub_l',
      title: 'a',
      url: 'a',
    },
  ]

  return (
    <div>
      <NewsTitleList configs={configs} />
    </div>
  )
}
