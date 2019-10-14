
import axios from 'axios'
// let url = 'http://192.168.1.253:30001/open/1.0'
let libra_api='http://47.52.66.26:10080'
let url = 'http://192.168.1.112:10080'
function total_value(res) {
    let total_val = [];
    for (let i = 0; i < res.showtx.length; i++) {
        let temp = 0;
        for (let j = 0; j < res.showtx[i].nextaddress.length; j++) {
            temp += res.showtx[i].nextaddress[j].value;
        }
        total_val.push(temp);
    }
    return total_val;
}

export let getCurFrame = (params) => {
    return dispatch => {
        dispatch({
            type: 'FRAME',
            data: params.frame
        })

    }
}
//主网table首页展示当前时间点的块详情
export let getCurListBlock = () => {
    return dispatch => {
        axios.get(url+'/recent_txn2').then(res => {
            dispatch({
                type: 'NETTABLES',
                data: res.data
            })
        })

    }
}
//测试网table首页展示当前时间点的块详情
export let getCurTestListBlock = () => {
    return dispatch => {
        axios.get(url + '/list_20block_test').then(res => {
            dispatch({
                type: 'PRICE',
                data: res.data.price
            })
            dispatch({
                type: 'TESTTABLES',
                data: res.data.block
            })
        })

    }
}
//点击或者搜索块的hash/height 展示块的详情与列出交易
export let getCurDetailBlock = (params) => {
    return dispatch => {
        
        axios.post(url + '/detail_block', params).then(res => {
            dispatch({
                type:'TOTAL',
                data:total_value(res.data)
            })
            dispatch({
                type: 'DETAIL',
                data: res.data.detail
            })
            dispatch({
                type: 'SHOWTX',
                data: res.data.showtx
            })
        })

    }
}
//点击或者搜索地址 展示地址的详情，列出该地址参与的交易
export let getCurDetailAddress = (params) =>{
    return dispatch=>{
        axios.get(url+'/address_info2/?address='+params.address).then(res=>{
            // console.log(res)
            dispatch({
                type:'LIST',
                data:res.data
            })
            // dispatch({
            //     type:'TXS',
            //     data:res.data.txs
            // })
    })

}
}
export let getCurDetailsAddress = (params) =>{
    return dispatch=>{
        axios.get(url+'/address_tx_info2?offset=0&limit=20&address='+params.address).then(res=>{
            dispatch({
                type:'TXS',
                data:res.data
            })
    })

}
}
//搜索txid 展示交易详情，上下地址及BTC数额
export let getCurSearchtx = (params) => {
    return dispatch => {
        axios.get(url+'/txn_info2/?id='+params.txid).then(res => {
            dispatch({
                type: 'DEAL',
                data: res.data
            })

        })

    }
}
