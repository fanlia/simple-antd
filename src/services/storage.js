
import CryptoJS from 'crypto-js'

const SITES = [
  {
    page: 'http://epaper.hljnews.cn/hljrb/pc/layout/index.html',
    site: 'head title',
    out_date: '.newstime',
    list: '.newslist li',
    title: 'a',
    url: 'a',
    deep_page: '#list li:first a'
  },
  {
    page: 'http://paper.people.com.cn/rmrb/paperindex.htm',
    site: 'head title',
    out_date: '.date',
    list: '.news-list li',
    title: 'a',
    url: 'a',
  },
  // {
  //   page: 'https://bjrbdzb.bjd.com.cn/bjrb/paperindex.htm',
  //   site: 'head title',
  //   list: '.nav-list-group li',
  //   title: 'a',
  //   url: 'a',
  //   href: 'data-href',
  //   name: '北京日报',
  // },
  // {
  //   page: 'http://epaper.tianjinwe.com/tjrb/',
  //   site: 'head title',
  //   out_date: 'span.default strong',
  //   list: 'div#btdh td.black',
  //   title: 'a',
  //   url: 'a',
  // },
  // {
  //   page: 'https://paper.xinmin.cn/index/xmwb/index.html',
  //   site: 'head title',
  //   out_date: '.dzb-date-wrap',
  //   list: '.dzb-enter-nav-benban-wrap a',
  //   name: '新民晚报'
  // },
  // {
  //   page: 'https://app.cqrb.cn/www/cqnews/index.html',
  //   site: 'head title',
  //   list: 'div#newslist h3.mxzxItem',
  //   date: 'span',
  //   title: 'a',
  //   url: 'a',
  // },
  // {
  //   page: 'https://www.zhjtjt.com/Project/Default.aspx?i=3&j=0',
  //   site: 'head title',
  //   list: '.safetylist li',
  //   date: 'span',
  //   title: 'a',
  //   url: 'a',
  // },
  // {
  //   page: 'http://zrzyj.zhuhai.gov.cn/zwgk/gggs/jzgclgs/',
  //   site: 'head title',
  //   list: '.list01 li',
  //   date: 'span',
  //   title: 'a',
  //   url: 'a',
  // },
  // {
  //   page: 'http://zjj.zhuhai.gov.cn/zjj/hygl/ywgsgg/spfjgbags/index.html',
  //   site: 'head title',
  //   list: '.card-deck .card',
  //   date: 'small',
  //   title: 'h5',
  //   url: 'a',
  // },
  // {
  //   page: 'http://www.zhxz.gov.cn/xxgk/gzjg/qzfgzbm/qjyj/tzgg/',
  //   site: 'head title',
  //   list: '.ins-con-list li',
  //   date: 'span',
  //   title: 'a',
  //   url: 'a',
  // },
  // {
  //   page: 'https://www.zhjtjt.com/Project/propublic.aspx?i=3&j=4',
  //   site: 'head title',
  //   list: '.infopubList li',
  //   date: '.infopub_l',
  //   title: 'a',
  //   url: 'a',
  // },
]

const sKEY = 'skey skey'

export const get = (key) => {
  let data = localStorage.getItem(key)
  if (!data) {
    return SITES
  }
  data = CryptoJS.AES.decrypt(data, sKEY).toString(CryptoJS.enc.Utf8)
  const sites = JSON.parse(data)
  return sites
}

export const set = (key, sites) => {
  let data = JSON.stringify(sites)
  data = CryptoJS.AES.encrypt(data, sKEY).toString()
  localStorage.setItem(key, data)
  return sites
}
