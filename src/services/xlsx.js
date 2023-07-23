
import * as XLSX from 'xlsx'

export const downloadXLSX = (list, filename) => {
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(list, {
    skipHeader: true,
  })
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
  const date = new Date().toISOString().replace(/\.\d+Z/, '').replace('T', ' ')
  XLSX.writeFile(workbook, `${filename} ${date}.xlsx`)
}

