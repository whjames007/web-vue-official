import {
  formatDateTimeString
} from '../utils/FormatDateTimeString.js'

function computeDateTimeRange (index) {
  let date = new Date()
  let result = []
  switch (index) {
    case 'DAY':
      let begin = date.setHours(0, 0, 0)
      let end = date.setHours(23, 59, 59)
      result.push(formatDateTimeString(begin, 'DTS'))
      result.push(formatDateTimeString(end, 'DTS'))
      break
    case 'WEEK':
      result = '您好，您输入的账号或密码有误！'
      break
    case 'MOUNTH':
      result = '驱蚊器翁额'
      break
    case 'YEAR':
      result = '按时发电费'
      break
    default:
      result = ['1949-10-01 00:00:00', '2049-09-30 23:59:59']
      break
  }
  return result
}
export {
  computeDateTimeRange
}
