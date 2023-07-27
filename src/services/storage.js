
import CryptoJS from 'crypto-js'

import { SITES } from '../sites/newspaper'

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
