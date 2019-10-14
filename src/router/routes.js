import App from "../view/app";
import MainNet from "../view/mainNet/mainNet";
// import Total from "../view/mainNet/total";
import BlockHeight from "../view/mainNet/blockHeight";
import DealBox from "../view/mainNet/deal";
import PieceHash from "../view/mainNet/pieceHash";
import AddressBox from "../view/mainNet/address";
import BlockHeight1 from "../view/testNet/blockHeight1";
import DealBox1 from "../view/testNet/deal1";
import PieceHash1 from "../view/testNet/pieceHash1";
import AddressBox1 from "../view/testNet/address1";
import TestNet from "../view/testNet/testNet";
let routes = [
    //首页
    {  
        path:'/app',
        component:App,
        children:[
            {
                path:'/app/testNet',
                component:MainNet,
            },
            {
                path:'/app/blockHeight/:block',
                component:BlockHeight
            },
            {
                path:'/app/addressBox/:address',
                component:AddressBox
            },
            {
                path:'/app/dealbox/:txid',
                component:DealBox
            },
            {
                path:'/app/pieceHash/:hash',
                component:PieceHash
            },
            {
                path:'/app/blockHeight1/:block',
                component:BlockHeight1
            },
            {
                path:'/app/addressBox1/:address',
                component:AddressBox1
            },
            {
                path:'/app/dealbox1/:txid',
                component:DealBox1
            },
            {
                path:'/app/pieceHash1/:hash',
                component:PieceHash1
            },
            {
                path:'/app',
                redirect:'/app/testNet'
            }
        ]
    },
    {  
        path:'/',
        redirect:'/app'
    }
]

export default routes