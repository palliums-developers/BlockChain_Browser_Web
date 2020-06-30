
import axios from 'axios'
/**
 * https://github.com/trezor/blockbook/blob/master/docs/api.md#get-address
 */

// let url = 'http://192.168.1.253:30001/open/1.0'
// let libra_api = 'http://47.52.66.26:10080';

const neibu = 'https://api4.violas.io';
// const libra_api = 'http://52.27.228.84:4000/explorer/libra';
const neibu_violas = 'https://api4.violas.io/explorer/violas';
const waibu = 'https://api.violas.io';
// const libra_api = 'http://52.27.228.84:4000/explorer/libra';
const libra_api = 'https://api.violas.io/explorer/libra';
const violas_api = 'https://api.violas.io/explorer/violas';

// const BTC_api = 'http://localhost:10080/open/1.0';
// const BTC_api = 'https://api2.violas.io:10080/open/1.0';
const BTC_api = "https://chain.api.btc.com/v3/";
// const BTC_api = 'https://btc1.trezor.io/api/';
const tBTC_api = 'https://tbtc1.trezor.io/api/';
// const BTC_api = 'http://47.52.66.26:10080/open/1.0';
// const BTC_api = 'http://localhost:30001/open/1.0';
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
export let getCurTestListBlock = (_limit, _offset) => {
    return dispatch => {
        axios.get(libra_api + '/recent?limit=' + _limit + '&offset=' + _offset).then(res => {
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
export let get_libra_address = (_address, _offset, _limit) => {
    return dispatch => {
        axios.get(libra_api + '/address/' + _address + '?offset=' + _offset + '&limit=' + _limit)
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
        axios.get(libra_api + '/version/' + _version)
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
    // return dispatch => {
    //     axios.get(BTC_api + '/list_10block_main').then(res => {
    //         // console.log(res.data.block,'123')
    //         dispatch({
    //             type: 'BTC_main_List',
    //             data: res.data.block
    //         })
    //     })
    // }
    return dispatch => {
        axios.get(BTC_api + 'block/latest').then(res => {
            // console.log(res.data.height)
            dispatch({
                type: 'BTC_main_List',
                data: res.data.data.list
            })
            // console.log(res.data.data.height - 1, res.data.data.height - 2)

            axios.get(BTC_api + `block/${res.data.data.height},${res.data.data.height - 1},${res.data.data.height - 2},${res.data.data.height - 3},${res.data.data.height - 4}`)
                .then(res => {
                    dispatch({
                        type: 'BTC_main_List',
                        data: res.data.data
                    })
                })

            // console.log(res.data)

        })
    }
}

export let getBTCMainBlock = (_net, _type, _value, _limit, _offset) => {
    return dispatch => {
        // axios.get(BTC_api + '/search_block?net=' + _net + '&type=' + _type + '&value=' + _value + '&limit=' + _limit + '&offset=' + _offset).then(res => {
        //     // console.log(res.data)
        //     dispatch({
        //         type: 'BTC_main_block',
        //         data: res.data
        //     })
        // })
        axios.get(BTC_api + 'block/' + _value)
            .then(res => {
                dispatch({
                    type: 'BTC_main_block',
                    data: res.data.data
                })
            })
    }
}

export let getBTCMainBlockTx = (_height, _page) => {
    return dispatch => {
        axios.get(BTC_api + 'block/' + _height + '/tx?page1&pagesize=' + _page)
            .then(res => {
                dispatch({
                    type: 'BTC_main_block_tx',
                    data: res.data.data ? res.data.data.list : []
                })
            })
    }
}

export let getBTCMainTx = (_net, _txid) => {
    return dispatch => {
        // axios.get(BTC_api + '/search_txid?net=' + _net + '&txid=' + _txid).then(res => {
        //     // console.log(res)
        //     dispatch({
        //         type: 'BTC_main_txid',
        //         data: res.data
        //     })
        // })
        axios.get(BTC_api + 'tx/' + _txid)
            .then(res => {
                dispatch({
                    type: 'BTC_main_txid',
                    data: res.data.data
                })
            })
    }
}

export let getBTCMainAddress = (_net, _address, _page) => {
    // return dispatch => {
    //     axios.get(BTC_api + '/search_address?net=' + _net + "&address=" + _address + "&page=" + _page).then(res => {
    //         // console.log(res.data)
    //         dispatch({
    //             type: 'BTC_main_address',
    //             data: res.data
    //         })
    //     })
    // }
    return dispatch => {
        axios.get(BTC_api + 'address/' + _address)
            .then(res => {
                dispatch({
                    type: 'BTC_main_address',
                    data: res.data.data
                })
            })
    }
}
export let getBTCMainAddressTx = (_address, _page) => {
    return dispatch => {
        axios.get(BTC_api + 'address/' + _address + '/tx?pagesize=10&page=' + _page)
            .then(res => {
                dispatch({
                    type: 'BTC_main_address_tx',
                    data: res.data.data
                })
            })
    }
}
export let getBTCTestList = () => {
    return dispatch => {
        // axios.get(tBTC_api + '/list_10block_test').then(res => {
        //     // console.log(res.data.block,'123')
        //     dispatch({
        //         type: 'BTC_Test_List',
        //         data: res.data.block
        //     })
        // })

        axios.get(tBTC_api).then(async res => {
            let tBTCList = [];
            // console.log(tBTCList[0])
            let _height = res.data.backend.blocks;
            for (let i = 0; i < 5; i++) {
                let _height2 = _height - i;
                await axios.get(tBTC_api + '/block/' + _height2)
                    .then(res => {
                        tBTCList.push(
                            {
                                hash: res.data.hash,
                                height: res.data.height,
                                confirmation: res.data.confirmations,
                                size: res.data.size,
                                time: res.data.time
                            }
                        );
                    })
            }
            return tBTCList
        })
            .then(res => {
                // console.log(res.length)
                dispatch({
                    type: 'BTC_Test_List',
                    data: res
                })
            })
    }
}

// export let getBTCTestBlock = (_net, _type, _value, _limit, _offset) => {
//     return dispatch => {
//         axios.get(tBTC_api + '/search_block?net=' + _net + '&type=' + _type + '&value=' + _value + '&limit=' + _limit + '&offset=' + _offset).then(res => {
//             // console.log(res.data)
//             dispatch({
//                 type: 'BTC_Test_block',
//                 data: res.data
//             })
//         })
//     }
// }
export let getBTCTestBlock = (_temp) => {
    return dispatch => {
        axios.get(tBTC_api + '/block/' + _temp).then(res => {
            // console.log(res.data)
            dispatch({
                type: 'BTC_Test_block',
                data: res.data
            })
        })
    }
}

// export let getBTCTestTx = (_net, _txid) => {
//     return dispatch => {
//         axios.get(tBTC_api + '/search_txid?net=' + _net + '&txid=' + _txid).then(res => {
//             // console.log(res)
//             dispatch({
//                 type: 'BTC_Test_txid',
//                 data: res.data
//             })
//         })
//     }
// }
export let getBTCTestTx = (_txid) => {
    return dispatch => {
        axios.get(tBTC_api + '/tx/' + _txid).then(res => {
            // console.log(res)
            dispatch({
                type: 'BTC_Test_txid',
                data: res.data
            })
        })
    }
}
// export let getBTCTestAddress = (_net, _address, _page) => {
//     return dispatch => {
//         axios.get(tBTC_api + '/search_address?net=' + _net + "&address=" + _address + "&page=" + _page).then(res => {
//             // console.log(res.data)
//             dispatch({
//                 type: 'BTC_Test_address',
//                 data: res.data
//             })
//         })
//     }
// }
export let getBTCTestAddress = (_address, _page) => {
    return dispatch => {
        axios.get(tBTC_api + '/v2/address/' + _address + '?pageSize=10&details=txs&page=' + _page).then(res => {
            // console.log(res.data)
            dispatch({
                type: 'BTC_Test_address',
                data: res.data
            })
        })
    }
}
export let getViolas = (_limit, _offset) => {
    return dispatch => {
        // console.log(violas_api+'/recent_txn?limit='+_limit+'&offset='+_offset)
        // axios.get(neibu_violas + '/recent?limit=' + _limit + '&offset=' + _offset)
        axios.get(violas_api + '/recent?limit=' + _limit + '&offset=' + _offset)
            .then(res => {
                dispatch({
                    type: 'violas_list',
                    data: res.data.data
                })
            })
    }
}

export let getViolas_version = (_version) => {
    return dispatch => {
        axios.get(violas_api + '/version/' + _version)
            .then(res => {
                dispatch({
                    type: 'violas_version',
                    data: res.data.data
                })
            })
    }
}

// export let getViolas_address = (_address) => {
//     return dispatch => {
//         axios.get(violas_api + '/address/' + _address)
//             .then(res => {
//                 dispatch({
//                     type: 'violas_address',
//                     data: res.data.data
//                 })
//             })
//     }
// }
export let getViolas_address = (_address, _offset, _limit, _module) => {
    if (Number(_module) >= -1) {
        return dispatch => {
            axios.get(violas_api + '/address/' + _address + '?module=' + _module + '&offset=' + _offset + '&limit=' + _limit)
                .then(res => {
                    dispatch({
                        type: 'violas_address',
                        data: res.data.data
                    })
                })
        }
    } else {
        return dispatch => {
            axios.get(violas_api + '/address/' + _address + '?offset=' + _offset + '&limit=' + _limit)
                .then(res => {
                    dispatch({
                        type: 'violas_address',
                        data: res.data.data
                    })
                })
        }
    }
}
export let getViolas_address_module = (_module, _address) => {
    return dispatch => {
        axios.get(violas_api + '/address/' + _address + '?module=' + _module)
            .then(res => {
                dispatch({
                    type: 'violas_address_module',
                    data: res.data
                })
            })
    }
}

export let getCurrency = _ => {
    return async dispatch => {
        await axios.get(neibu + '/1.0/violas/currency')
            .then(res => {
                dispatch({
                    type: 'currency',
                    data: res.data.data
                })
            })
    }

    // return dispatch => {
    //     dispatch({
    //         type: 'currency',
    //         data: {
    //             currencies: [{
    //                 address: "00000000000000000000000000000001",
    //                 module: "LBR",
    //                 name: "LBR",
    //                 show_icon: "http://52.27.228.84:4000/1.0/violas/icon/violas.png",
    //                 show_name: "LBR"
    //             }, {
    //                 address: "00000000000000000000000000000001",
    //                 module: "VLSUSD",
    //                 name: "VLSUSD",
    //                 show_icon: "http://52.27.228.84:4000/1.0/violas/icon/violas.png",
    //                 show_name: "USD"
    //             }, {
    //                 address: "00000000000000000000000000000001",
    //                 module: "VLSEUR",
    //                 name: "VLSEUR",
    //                 show_icon: "http://52.27.228.84:4000/1.0/violas/icon/violas.png",
    //                 show_name: "EUR"
    //             }, {
    //                 address: "00000000000000000000000000000001",
    //                 module: "VLSGBP",
    //                 name: "VLSGBP",
    //                 show_icon: "http://52.27.228.84:4000/1.0/violas/icon/violas.png",
    //                 show_name: "GBP"
    //             }, {
    //                 address: "00000000000000000000000000000001",
    //                 module: "VLSJPY",
    //                 name: "VLSJPY",
    //                 show_icon: "http://52.27.228.84:4000/1.0/violas/icon/violas.png",
    //                 show_name: "JPY"
    //             }, {
    //                 address: "00000000000000000000000000000001",
    //                 module: "VLSSGD",
    //                 name: "VLSSGD",
    //                 show_icon: "http://52.27.228.84:4000/1.0/violas/icon/violas.png",
    //                 show_name: "SGD"
    //             }]
    //         },
    //     })
    // }
}

export let getAccountInfo = (_address) => {
    return async dispatch => {
        await axios.get(neibu + '/1.0/violas/account/info?address=' + _address)
            .then(res => {
                dispatch({
                    type: 'account_info',
                    data: res.data.data
                })
            })
    }
}

export let getAddressModule = (_address) => {
    return dispatch => {
        axios.get(waibu + '/1.0/violas/module?addr=' + _address)
            .then(res => {
                dispatch({
                    type: 'violas_address_holding_module',
                    data: res.data.data
                })
            })
    }
}
export let getModuleList = (_module_address, _limit, _offset) => {
    return dispatch => {
        axios.get(violas_api + "/recent/" + _module_address + "?limit=" + _limit + "&offset=" + _offset)
            .then(res => {
                dispatch({
                    type: 'module_list',
                    data: res.data.data
                })
            })
    }
}
//显示隐藏表单
export let showGetCoins = () => {
    return dispatch => {
        dispatch({
            type: 'GETCOINS',
            data: true
        })
    }
}

export let closeGetCoins = () => {
    return dispatch => {
        dispatch({
            type: 'GETCOINS',
            data: false
        })
    }
}
//提交表单
export let getCoinsFun = (_address, _token_id, _auth_key_prefix) => {
    return dispatch => {
        axios.get(`${neibu_violas}/faucet?address=${_address}&currency=${_token_id}&auth_key_prefix=${_auth_key_prefix}`)
            .then(res => {
                // console.log(res.data)
                if (res.data && res.data.message == "ok") {
                    dispatch({
                        type: 'WARN',
                        data: 'You get test coins successful'
                    })
                } else {
                    dispatch({
                        type: 'WARN',
                        data: 'You get test coins failed'
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: 'WARN',
                    data: 'You get test coins failed'
                })
            })
    }
}

export let getWarning = (params) => {
    return dispatch => {
        dispatch({
            type: 'WARN',
            data: params
        })
    }
}