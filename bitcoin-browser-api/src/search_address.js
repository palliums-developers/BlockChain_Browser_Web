const b_c = require("./bitcoin-core-function");
// async function search_address(net,address){
//     let temp=await b_c.UTXO_TESTNET(net,address);
//     let txids=[]
//     for (let i in temp.data.txs){
//         txids.push(temp.data.txs[i].txid)
//     }
//     let txsinfo=[];
//     for(let i in txids){
//         let txinfo=await b_c.tx_info(net,txids[i])
//         txsinfo.push(txinfo)
//     }
//     let res={
//         net:net,
//         address:address,
//         balance:temp.data.balance,
//         received:temp.data.received,
//         amount:temp.data.tx_count,
//         txs:txsinfo,
//     }

//     // console.log(res);
//     // console.log(res.txs[0].nextaddress);
//     return res
// }
const search_address = async (_net, _address, _page) => {
  let result;
  switch (_net) {
      case "mainnet":
          result = await b_c.address_tx_mainnet_bitmain(_address, _page);
          break;
      case "testnet":
          result = await b_c.address_tx_testnet_bitmain(_address, _page);
          break;
      default:
          result = await b_c.address_tx_mainnet_bitmain(_address, _page);
  }
  // result = await b_c.address_tx_blockCypher(_net, _address);
  // console.log(result)
  return result;
};
module.exports = {
  search_address
};
// search_address('testnet','n2rXRfQVC8Jc8Nip3AHZK78xna2GCZUUjV',1)
// search_address('mainnet','1L8P9giWzQTZVjDzfvYUwXbw8KzFxMDVh2',1)
