import App from "../view/app";
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
            // {
            //     path: '/app/blockHeight/:block',
            //     component: BlockHeight
            // },
            // {
            //     path: '/app/addressBox/:address',
            //     component: AddressBox
            // },
            // {
            //     path: '/app/dealbox/:txid',
            //     component: DealBox
            // },
            // {
            //     path: '/app/pieceHash/:hash',
            //     component: PieceHash
            // },
            // {
            //     path: '/app/blockHeight1/:block',
            //     component: BlockHeight1
            // },
            // {
            //     path: '/app/addressBox1/:address',
            //     component: AddressBox1
            // },
            // {
            //     path: '/app/dealbox1/:txid',
            //     component: DealBox1
            // },
            // {
            //     path: '/app/pieceHash1/:hash',
            //     component: PieceHash1
            // },
            {
                path: '/app',
                redirect: '/app/Violas'
            }
        ]
    },
    {
        path: '/',
        redirect: '/app'
    }
]

export default routes