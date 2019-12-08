
import axios from 'axios'
// let url = 'http://192.168.1.253:30001/open/1.0'
// let libra_api = 'http://47.52.66.26:10080';
const libra_api = 'http://52.27.228.84:4001/libra';
const BTC_api = 'http://localhost:30001/open/1.0';
// const BTC_api = 'http://192.168.1.111:30001/open/1.0';
//let url = 'http://192.168.1.112:10080';
let url = 'https://wallet.violas.io';

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
        axios.get(url + '/recent_txn2').then(res => {
            dispatch({
                type: 'NETTABLES',
                data: res.data
            })
        })

    }
}
//测试网table首页展示当前时间点的块详情
// export let getCurTestListBlock = () => {
//     return dispatch => {
//         axios.get(url + '/list_20block_test').then(res => {
//             dispatch({
//                 type: 'PRICE',
//                 data: res.data.price
//             })
//             dispatch({
//                 type: 'TESTTABLES',
//                 data: res.data.block
//             })
//         })

//     }
// }
export let getCurTestListBlock = () => {
    return dispatch => {
        axios.get(libra_api + '/recent_txn?limit=10&offset=0').then(res => {
            // console.log(res.data.data)
            dispatch({
                type: 'libra_testnet',
                data: res.data.data
            })
        })
    }
}
//点击或者搜索块的hash/height 展示块的详情与列出交易
export let getCurDetailBlock = (params) => {
    return dispatch => {

        axios.post(url + '/detail_block', params).then(res => {
            dispatch({
                type: 'TOTAL',
                data: total_value(res.data)
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
export let getCurDetailAddress = (params) => {
    return dispatch => {
        axios.get(url + '/address_info2/?address=' + params.address).then(res => {
            // console.log(res)
            dispatch({
                type: 'LIST',
                data: res.data
            })
            // dispatch({
            //     type:'TXS',
            //     data:res.data.txs
            // })
        })

    }
}
export let getCurDetailsAddress = (params) => {
    return dispatch => {
        axios.get(url + '/address_tx_info2?offset=0&limit=20&address=' + params.address).then(res => {
            dispatch({
                type: 'TXS',
                data: res.data
            })
        })

    }
}
export let get_libra_address = (_address) => {
    return dispatch => {
        axios.get(libra_api + '/address_info?address=' + _address)
            .then(res => {
                // console.log(res.data.data,'sdasd');
                dispatch({
                    type: 'libra_address',
                    data: res.data.data
                })
            })
    }
}
export let get_libra_version = (_version) => {
    return dispatch => {
        axios.get(libra_api + '/txn_info?version=' + _version)
            .then(res => {
                dispatch({
                    type: 'libra_version',
                    data: res.data.data
                })
            })
    }
}
//搜索txid 展示交易详情，上下地址及BTC数额
export let getCurSearchtx = (params) => {
    return dispatch => {
        axios.get(url + '/txn_info2/?id=' + params.txid).then(res => {
            dispatch({
                type: 'DEAL',
                data: res.data
            })
        })
    }
}

export let getBTCMainList = () => {
    return dispatch => {
        axios.get(BTC_api + '/list_10block_main').then(res => {
            // console.log(res.data.block,'123')
            dispatch({
                type: 'BTC_main_List',
                data: res.data.block
            })
        })
    }
}

export let getBTCMainBlock = (_net, _type, _value, _limit, _offset) => {
    return dispatch => {
        axios.get(BTC_api + '/search_block?net=' + _net + '&type=' + _type + '&value=' + _value + '&limit=' + _limit + '&offset=' + _offset).then(res => {
            // console.log(res.data)
            dispatch({
                type: 'BTC_main_block',
                data: res.data
            })
        })
    }
}

export let getBTCMainTx=(_net,_txid)=>{
    return dispatch=>{
        axios.get(BTC_api+'/search_txid?net='+_net+'&txid='+_txid).then(res=>{
            // console.log(res)
            dispatch({
                type:'BTC_main_txid',
                data:res.data
            })
        })
    }
}

export let getBTCMainAddress=(_net,_address,_page)=>{
    return dispatch=>{
        axios.get(BTC_api+'/search_address?net='+_net+"&address="+_address+"&page="+_page).then(res=>{
            // console.log(res.data)
            dispatch({
                type:'BTC_main_address',
                data:res.data
            })
        })
    }
}
export let getBTCTestList = () => {
    return dispatch => {
        axios.get(BTC_api + '/list_10block_test').then(res => {
            // console.log(res.data.block,'123')
            dispatch({
                type: 'BTC_Test_List',
                data: res.data.block
            })
        })
    }
}

export let getBTCTestBlock = (_net, _type, _value, _limit, _offset) => {
    return dispatch => {
        axios.get(BTC_api + '/search_block?net=' + _net + '&type=' + _type + '&value=' + _value + '&limit=' + _limit + '&offset=' + _offset).then(res => {
            // console.log(res.data)
            dispatch({
                type: 'BTC_Test_block',
                data: res.data
            })
        })
    }
}

export let getBTCTestTx=(_net,_txid)=>{
    return dispatch=>{
        axios.get(BTC_api+'/search_txid?net='+_net+'&txid='+_txid).then(res=>{
            // console.log(res)
            dispatch({
                type:'BTC_Test_txid',
                data:res.data
            })
        })
    }
}

export let getBTCTestAddress=(_net,_address,_page)=>{
    return dispatch=>{
        axios.get(BTC_api+'/search_address?net='+_net+"&address="+_address+"&page="+_page).then(res=>{
            // console.log(res.data)
            dispatch({
                type:'BTC_Test_address',
                data:res.data
            })
        })
    }
}