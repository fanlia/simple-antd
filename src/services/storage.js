
import CryptoJS from 'crypto-js'

const sKEY = 'skey skey'

export const get = (key, defaultValue) => {
  let data = localStorage.getItem(key)
  if (!data) {
    return defaultValue
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
