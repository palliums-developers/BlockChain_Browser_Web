const b_c=require('./bitcoin-core-function')

//check txid
// async function searchTransaction(){
//     let hash=await b_c.getblockhash(590777);
//     let block=await b_c.getblock(hash);
//     console.log(block.tx[11])
//     let tx=await b_c.getrawtransaction(block.tx[11]);
//     let vin=[];
//     for(i in tx.vin){
//         vin.push(
//             {
//                 txid:tx.vin[i].txid,
//                 vout:tx.vin[i].vout
//             }
//         );
//     }
//     let vout=b_c.vout_value_address(tx);
//     console.log(vin,'...............vin');
//     console.log(vout,'.............vout');
//     vout_pre=[]
//     for(i in vin){
//         let tx_pre=await b_c.getrawtransaction(vin[i].txid);
//         vout_pre.push(
//             b_c.pre_vout_value_address(tx_pre,vin[i].vout)
//         )
//     }
//     console.log(vout_pre,'...........vout_pre');
// }

// searchTransaction();
// async function run_getblockcount(){
//     let temp= b_c.getblockcount();
//     return temp;
// }
// async function aaa(){
//     let temp=await run_getblockcount();
//     console.log(temp);
//     return temp;
// }
// aaa();
// console.log(aaaa);

async function search_transaction(net,txid){
    let temp = await b_c.tx_info(net,txid);
    // console.log(temp)
    return temp;
}
module.exports={
    search_transaction
}
// search_transaction('81645e9855aa2a624d9b09f28e13e80500280ae6dfe2ba82e40f9855177e22ed');
// search_transaction('mainnet','ae4cd5ab9a517c8cf46d838d00c175a15909d6c90ea5034d3d8ae090eb86faf8')