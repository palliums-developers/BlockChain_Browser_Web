const Client = require("bitcoin-core");
const axios = require("axios");
const host_uk = "51.140.241.96";
const host_chongqing = "94.191.95.240";
const username = "palliums";
const password_uk = "qazpl,";
const host_zhangjiakou = "47.92.49.137";
const password_zhangjiakou = "qpalzm";
const bitmain_mainnet = "https://chain.api.btc.com/v3/address/";
const bitmain_testnet = "https://tchain.api.btc.com/v3/address/";
const bitmain_tail = "/tx?pagesize=10&page=";

const mainnet = new Client({
  network: "mainnet",
  host: host_zhangjiakou,
  port: 8332,
  username: username,
  password: password_zhangjiakou
});
const testnet = new Client({
  network: "testnet",
  host: host_chongqing,
  port: 18332,
  username: username,
  password: password_uk
});

function whichnet(_net) {
  // console.log(typeof(_net))
  switch (_net) {
    case "testnet":
      return testnet;
    default:
      return mainnet;
  }
}

//RPC functions
async function getblockcount(_net) {
  let client = whichnet(_net);
  return client.getBlockCount().then(res => {
    return res;
  })
    .catch(e => console.log("error", e));
}

async function getblockhash(_net, _height) {
  // console.log(_net,_height)
  let client = whichnet(_net);
  return client.getBlockHash(_height).then(res => {
    // console.log(res, 'aaaaaaaaaaaaaaaaaa');
    return res;
  })
    .catch(e => console.log("error", e));
}
// getblockhash('mainnet',999)
async function getblock(_net, _hash) {
  let client = whichnet(_net);
  return client.getBlock(_hash)
    .then(res => {
      // console.log(res)
      return res;
    })
    .catch(e => console.log("error", e));
}
// getblock('net','000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f')
async function getrawtransaction(_net, txid) {
  let client = whichnet(_net);
  return client
    .getRawTransaction(txid, 1)
    .then(res => {
      // console.log(res)
      return res;
    })
    .catch(e => console.log("error", e));
}
// getrawtransaction('mainnet','4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b')
// getrawtransaction('mainnet','be628960b5d93f19ea6293b62d4805b30678e1a3e0757c97fc0e6878340ef89f')

// block profit
async function getBlockHashProfit(_net, hash) {
  let block = await getblock(_net, hash);
  let tx = await getrawtransaction(_net, block.tx[0]);
  // console.log(tx.vout[0].value,'.................block profit')
  return tx.vout[0].value;
}
async function getBlockHeightProfit(_net, height) {
  let hash = await getblockhash(_net, height);
  let block = await getblock(_net, hash);
  let tx = await getrawtransaction(_net, block.tx[0]);
  // console.log(tx.vout[0].value,'.................block profit')
  return tx.vout[0].value;
}

//get block height
async function getBlockHeight(_net, _hash) {
  let tx = -1;
  tx = await getblock(_net, _hash);
  if (tx) {
    // console.log(tx.height);
    return tx.height;
  } else {
    // console.log(tx.height);
  }
}
// getBlockHeight('mainnet','0000000000000000000b73363f8d485270d6614e6f6679fbe89424bd4b29890b')

//input (raw tx json) return vout in [value:Number, address:String]
function vout_value_address(tx) {
  let vout = [];
  for (i in tx.vout) {
    if (tx.vout[i].scriptPubKey.addresses) {
      vout.push({
        value: tx.vout[i].value,
        address: tx.vout[i].scriptPubKey.addresses[0]
      });
    } else if (tx.vout[i].value > -1) {
      vout.push({
        value: tx.vout[i].value,
        address: "Unable to decode output address"
      });
    }
  }
  return vout;
}
//input (raw tx json,index in vout) return pre address vout in [value:Number, address:String]
function pre_vout_value_address(tx, index) {
  let vout = {
    value: tx.vout[index].value,
    address: tx.vout[index].scriptPubKey.addresses[0]
  };
  // console.log(vout,"..........")
  return vout;
}
//input txid return vin and vout address with info
async function tx_info(_net, raw_txid) {
  if (_net == "mainnet" && raw_txid == "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b") {
    let res = {
      net: _net,
      txid: raw_txid,
      blockhash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
      blockheight: 0,
      timestamp: 1231006505,
      size: 204,
      weight: 816,
      confirmations: await getblockcount(),
      input: 0,
      output: 50,
      preaddress: [
        {
          value: 0,
          address: "No Inputs (Newly Generated Coins)"
        }
      ],
      nextaddress: [
        {
          value: 50,
          address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        }
      ],
      fee: 0
    };
    // console.log(res)
    return res;
  } else {
    // console.log(raw_txid,'qweqweqwe')
    let tx = await getrawtransaction(_net, raw_txid);
    // console.log(tx,'qwerdqwdwq')
    let vin = [];
    for (i in tx.vin) {
      if (!tx.vin[i].coinbase) {
        vin.push({
          txid: tx.vin[i].txid,
          voutNum: tx.vin[i].vout
        });
      } else {
        vin.push({
          txid: "coinbase",
          voutNum: -1
        });
      }
    }
    let vout = vout_value_address(tx);
    // console.log(vin, '...............vin');
    // console.log(vout, '.............vout');
    let vout_pre = [];
    for (i in vin) {
      if (vin[i].txid == "coinbase") {
        vout_pre.push({
          value: 0,
          address: "coinbase"
        });
      } else {
        if (vin[i].voutNum > -1) {
          let tx_pre = await getrawtransaction(_net, vin[i].txid);
          vout_pre.push(pre_vout_value_address(tx_pre, vin[i].voutNum));
        }
      }
    }
    // console.log(vout_pre, '...........vout_pre');
    let res = {
      net: _net,
      txid: raw_txid,
      blockhash: tx.blockhash,
      blockheight: 0,
      timestamp: tx.time,
      size: tx.size,
      weight: tx.weight,
      confirmations: tx.confirmations,
      input: 0,
      output: 0,
      preaddress: [],
      nextaddress: [],
      fee: 0
    };
    res.blockheight = await getBlockHeight(_net, tx.blockhash);
    for (i in vout_pre) {
      res.preaddress.push(vout_pre[i]);
      res.input += vout_pre[i].value;
    }
    for (i in vout) {
      res.nextaddress.push(vout[i]);
      res.output += vout[i].value;
    }
    res.fee = res.input - res.output;
    // console.log(res);
    return res;
  }
}
// tx_info('mainnet','02d054350e6e28cb1948e71e7595c54ae326e9d4f238cf7baeaf2a6945545519');
// tx_info('mainnet', '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b');

//input txid, return preaddress and nextaddress
//list last block hash form offset to limit
async function listLastBlock(_net, limit, offset) {
  let last_height = (await getblockcount(_net)) - offset;
  let last_somehash = [];
  for (let i = last_height; i > last_height - limit; i--) {
    last_somehash.push(await getblockhash(_net, i));
  }
  // console.log(last_somehash);
  return last_somehash;
}

//list tx form offset to limit in block hash
async function listTxInBlock(_net, hash, limit, offset) {
  let block_txs = [];
  let block = await getblock(_net, hash);
  if (offset < block.tx.length && limit + offset < block.tx.length) {
    block_txs = block.tx.slice(offset, limit + offset);
  } else if (offset < block.tx.length && limit + offset > block.tx.length) {
    block_txs = block.tx.slice(offset, block.tx.length);
  }
  return block_txs;
}

async function USDprice() {
  let url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD";
  const fetch = require("node-fetch");
  let temp;
  await fetch(url)
    .then(res => res.json())
    .then(res => {
      return (temp = res);
    })
    .catch(e => console.log("error", e));
  console.log(temp);
  return temp;
}

async function UTXO_TESTNET(_net, address) {
  let url;
  if (_net == "testnet") {
    url = "http://94.191.95.240:5000/utxo/";
  }
  const fetch = require("node-fetch");
  let temp;
  await fetch(url + address)
    .then(res => res.json())
    .then(res => {
      return (temp = res);
    })
    .catch(e => console.log("error", e));
  return temp;
}
// UTXO_TESTNET('testnet','n2rXRfQVC8Jc8Nip3AHZK78xna2GCZUUjV');

const address_tx_mainnet_bitmain = async (_address, _page) => {
  let _data = await axios
    .get(bitmain_mainnet + _address )
    .then(res => { return res.data.data; });
  let url = bitmain_mainnet + _address + bitmain_tail + _page;
  let _list = await axios.get(url).then(res => {
    return res.data.data;
  });
  let temp = { data: _data, list: _list };
  return temp;
};

const address_tx_testnet_bitmain = async (_address, _page) => {
  let _data = await axios
    .get(bitmain_testnet + _address )
    .then(res => { return res.data.data; });
  let _list = await axios
    .get(bitmain_testnet + _address + bitmain_tail + _page)
    .then(res => {
      // return res.data.data.list;
      return res.data.data;
    });
  let temp = { data: _data, list: _list };
  return temp;
};

const address_tx_blockCypher = async (_net, _address) => {
  let net = _net == "testnet" ? "test3" : "main";
  let temp = await axios
    .get("https://api.blockcypher.com/v1/btc/" + net + "/addrs/" + _address + "/full?limit=10")
    .then(res => { return res.data; });
  // if(temp.hasMore){
  //     console.log(temp.txs[9].block_height)
  // }
  // console.log(temp)
  return temp;
};
// address_tx_mainnet_bitmain("bc1qjl8uwezzlech723lpnyuza0h2cdkvxvh54v3dn", 1);
// address_tx_mainnet('1L8P9giWzQTZVjDzfvYUwXbw8KzFxMDVh2',1)
// address_tx_testnet("mjBLq9T4QBniBbu3NQVMBkg3EYo5Y9q3nK", 1);

// address_tx_blockcypher("mainnet","bc1qjl8uwezzlech723lpnyuza0h2cdkvxvh54v3dn")
// address_tx_blockcypher("testnet","mjBLq9T4QBniBbu3NQVMBkg3EYo5Y9q3nK")

module.exports = {
  getblockcount,
  getblockhash,
  getblock,
  getrawtransaction,
  vout_value_address,
  pre_vout_value_address,
  listLastBlock,
  getBlockHeightProfit,
  USDprice,
  getBlockHashProfit,
  tx_info,
  UTXO_TESTNET,
  getBlockHeight,
  address_tx_mainnet_bitmain,
  address_tx_testnet_bitmain,
  address_tx_blockCypher
};
