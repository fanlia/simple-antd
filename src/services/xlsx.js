
import * as XLSX from 'xlsx'

export const downloadXLSX = (list, filename) => {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(list)
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  const date = new Date().toISOString().replace(/\.\d+Z/, '').replace('T', ' ')
  XLSX.writeFile(workbook, `${filename} ${date}.xlsx`)
}

export const readFile = async (file) => {
  const buf = await file.arrayBuffer()
  const workbook = XLSX.read(buf)
  const name = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[name]
  const list = XLSX.utils.sheet_to_json(worksheet)
  return list
}

