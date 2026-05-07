export function formatDate(datetimeString: string, type: 'date' | 'datetime' = 'date') {
  const d = new Date(datetimeString)
  if (Number.isNaN(d.getTime()))
    return '' // 无效日期处理

  const pad = (n: number) => n.toString().padStart(2, '0')

  const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  if (type === 'date')
    return date

  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
  return `${date} ${time}`
}
