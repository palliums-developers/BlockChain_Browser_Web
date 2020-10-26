import App from "../view/app";
import axios from "axios"
import Libra_testnet from "../view/Libra_testnet/Libra_testnet";
import DealBox from "../view/Libra_testnet/deal";
import AddressBox from "../view/Libra_testnet/address";
// import Total from "../view/Libra_testnet/total";
// import BlockHeight from "../view/Libra_testnet/blockHeight";
// import PieceHash from "../view/Libra_testnet/pieceHash";
// import BlockHeight1 from "../view/Violas/blockHeight1";
// import DealBox1 from "../view/Violas/deal1";
// import PieceHash1 from "../view/Violas/pieceHash1";
// import AddressBox1 from "../view/Violas/address1";
// import TestNet from "../view/Violas/Violas";
import BTC from "../view/BTC_mainNet/mainNet";
import BTC_address from "../view/BTC_mainNet/address";
import BTC_block from "../view/BTC_mainNet/blockHeight";
import BTC_transaction from "../view/BTC_mainNet/deal";
import BTC_testnet from "../view/BTC_testnet/testNet";
import BTC_testnet_address from "../view/BTC_testnet/address";
import BTC_testnet_block from "../view/BTC_testnet/blockHeight";
import BTC_testnet_transaction from "../view/BTC_testnet/deal";
import Violas from "../view/Violas/Violas";
import Violas_version from "../view/Violas/deal";
import Violas_address from "../view/Violas/address";
import Currency from "../view/Violas/Currency";
import Faucet from "../view/faucet/faucet"
const wallet_api = 'http://52.27.228.84:4000';
let routes = [
    //首页
    {
        path: '/app',
        component: App,
        children: [
            {
                path: '/app/Violas',
                component: Violas,
            },
            {
                path: '/app/Violas_version/:version',
                component: Violas_version
            },
            {
                path: '/app/Violas_address/:address',
                component: Violas_address
            },
            {
                path: '/app/Libra',
                component: Libra_testnet,
            },
            {
                path: '/app/Libra_dealbox/:txid',
                component: DealBox
            },
            {
                path: '/app/Libra_addressBox/:address',
                component: AddressBox
            },
            {
                path: '/app/BTC',
                component: BTC,
            },
            {
                path: '/app/BTC_block/:block_hash',
                component: BTC_block
            },
            {
                path: '/app/BTC_transaction/:transaction',
                component: BTC_transaction
            },
            {
                path: '/app/BTC_address/:address',
                component: BTC_address
            },
            {
                path: '/app/tBTC',
                component: BTC_testnet,
            },
            {
                path: '/app/tBTC_block/:block_hash',
                component: BTC_testnet_block
            },
            {
                path: '/app/tBTC_transaction/:transaction',
                component: BTC_testnet_transaction
            },
            {
                path: '/app/tBTC_address/:address',
                component: BTC_testnet_address
            },
            {
                path: '/app/Currency/:module_name',
                component: Currency
            },
            {
                path: '/app',
                redirect: '/app/Violas'
            }
        ]
    },
    {
        path:'/faucet/:address',
        component: Faucet
    },
    {
        path:'/faucet',
        component: Faucet
    },
    {
        path: '/',
        redirect: '/app'
    }
]

// let currency = async _ => {
//     let result = await axios.get(wallet_api + '/1.0/violas/currency')
//         .then(res => { return res.data.data })
//     return result
// }

// let addRouter = async (_currency) => {
//     let _currency_temp=await _currency;
//     let _routes=routes;
//     if(_currency_temp){
//         for(let i in _currency_temp){
//             let temp={
//                 path:'/app/'+_currency_temp[i].name+'/:address',
//                 component:Violas_address
//             }
//             _routes[0].children.push(temp)
//         }
//     }
//     return _routes
// }
// addRouter(currency());

export default routes