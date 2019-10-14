import request from '../utils/request'

let url = 'http://192.168.1.253:30001/open/1.0'
export let listBlockFun = (params) =>{
    return request.post(url+'/list_block',params)
}