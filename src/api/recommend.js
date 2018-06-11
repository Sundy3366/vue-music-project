const commonParams = {
  g_tk:5381,
  uin:0,
  format:'json',
  inCharset:'utf-8',
  outCharset:'utf-8',
  notice:0,
  // platform:'h5',
  // needNewCode:1
}
import axios from 'axios'


export function getDiscList() {
  const url ='/api/getDiscList'
  const data = Object.assign({},commonParams,{
    picmid:1,
    rnd:0.12964704512508352,
    g_tk:5381,
    loginUin:0,
    hostUin:0,
    format:'json',
    notice:0,
    platform:'yqq',
    needNewCode:0,
    categoryId:10000000,
    sortId:5,
    sin:0,
    ein:29,
  })
  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}


