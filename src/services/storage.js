
import CryptoJS from 'crypto-js'

const SITES = [
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
