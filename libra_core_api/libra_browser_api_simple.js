const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fetch = require('node-fetch')
const PORT = 10080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

/**
 * https://librachecker.com/
 */
app.get('/recent_txn', function (req, res, next) {
  fetch('https://api.librachecker.com/recent_txn')
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})

app.get('/txn_info', function (req, res, next) {
  let id = req.query.id;
  fetch('https://api.librachecker.com/txn_info/?_id=' + id)
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})

app.get('/address_info', function (req, res, next) {
  let address = req.query.address;
  fetch('https://api.librachecker.com/address_info/?address=' + address)
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})

/**
 * https://librablock.io/
 */
app.get('/recent_txn1', function (req, res, next) {
  fetch('https://api.librablock.io/version?limit=20&offset=0')
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})

app.get('/txn_info1', function (req, res, next) {
  let id = req.query.id;
  fetch('https://api.librablock.io/version/' + id)
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})

app.get('/address_info1', function (req, res, next) {
  let address = req.query.address;
  fetch('https://api.librablock.io/account/' + address)
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})

app.get('/address_detail1', function (req, res, next) {
  let address = req.query.address;
  let limit = req.query.limit;
  let offset = req.query.offset;
  fetch('https://api.librablock.io/version?limit=' + limit + '&offset=' + offset + '&address=' + address)
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})
//a0d3aba633db4b3c6ff40ea6e5da7a030cf7523ef65139d4f16f14438ddc7b31
//https://api-test.libexplorer.com/api?module=account&action=txlist&address=a0d3aba633db4b3c6ff40ea6e5da7a030cf7523ef65139d4f16f14438ddc7b31

/**
 * libexplorer https://libexplorer.com/
 */
async function libexplorer_lastVersion() {
  return fetch('https://api-test.libexplorer.com/api?module=version&action=latest')
    .then(res1 => res1.json())
}
async function libexplorer_getVersion(version) {
  return fetch('https://api-test.libexplorer.com/api?module=version&action=getversion&version=' + version)
    .then(res1 => res1.json())
}
async function libexplorer_address_info(address) {
  let balance = await fetch('https://api-test.libexplorer.com/api?module=account&action=balance&address=' + address)
    .then(res1 => res1.json());
  let send = await fetch('https://api-test.libexplorer.com/api?module=account&action=totalsent&address=' + address)
    .then(res1 => res1.json());
  let receive = await fetch('https://api-test.libexplorer.com/api?module=account&action=totalreceived&address=' + address)
    .then(res1 => res1.json());
  // console.log(balance.result,send.result,receive.message);
  let info = {
    balance: balance.result,
    send: send.result,
    receive: receive.result
  }
  return info;
}
// (async function (address){
//   let balance=await fetch('https://api-test.libexplorer.com/api?module=account&action=balance&address='+address)
//   .then(res1=>res1.json());
//   console.log(balance.result);
// })('a45ab464d5907fdda558a40d89ecec2803e360013471dd2e6d2e7d84760efd8d')
async function libexplorer_list_tx_of_address(address) {
  return fetch('https://api-test.libexplorer.com/api?module=account&action=txlist&address=' + address)
    .then(res1 => res1.json())
}
app.get('/recent_txn2', async function (req, res, next) {
  // let limit=req.query.limit;
  let limit = 20;
  let last = await libexplorer_lastVersion();
  let arr = [];
  for (let i = last.result; i > last.result - limit; i--) {
    let temp = await libexplorer_getVersion(i);
    arr.push(temp.result);
  }
  res.send(arr);
})
app.get('/txn_info2', function (req, res, next) {
  let id = req.query.id;
  fetch('https://api.librachecker.com/txn_info/?_id=' + id)
    .then(res1 => res1.json())
    .then(res1 => res.send(res1))
})
app.get('/address_info2', async function (req, res, next) {
  let address = req.query.address;
  // console.log(address);
  let result = await libexplorer_address_info(address);
  res.send(result);
})
app.get('/address_tx_info2', async function (req, res, next) {
  let address = req.query.address;
  let tx = await libexplorer_list_tx_of_address(address);
  res.send(tx.result.reverse());
})

app.listen(PORT, function () {
  console.log('CORS-enabled web server listening on port ' + PORT)
})