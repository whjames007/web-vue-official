
function conversionResponeCode (code) {
  let result = null
  switch (code) {
    case 'GEWEI_10001':
      result = '系统故障，请和系统管理员联系！'
      break
    case 'GEWEI_10002':
      result = 'confirm' // '您好，您输入的账号或密码有误！'
      break
    case 'GEWEI_10003':
      result = '驱蚊器翁额'
      break
    case 'GEWEI_10004':
      result = '按时发电费'
      break
    default:
      result = '未知故障，请和系统管理员联系！'
      break
  }
  return result
}
export {
  conversionResponeCode
}
