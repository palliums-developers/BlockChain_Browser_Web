const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
const file1 = "../log/lastblock_main.json";
const file2 = "../log/lastblock_test.json";
const url0 = "/open/1.0";

const RateLimit = require("express-rate-limit");
const apiLimiter = new RateLimit({
  windowMs: 60 * 60 * 1000,
  max: 60 * 60 * 1000 * 100
});
app.use(url0, apiLimiter);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 30001;
const b_l = require("./list_block");
const s_t = require("./search_transaction");
const d_b = require("./detail_block");
const b_c = require("./bitcoin-core-function");
const s_a = require("./search_address");

app.get(url0, (req, res) => res.send("welcome come to Bitcoin Browser API"));

app.post(url0 + "/testPost", (req, res) => {
  response = req.body;
  console.log(response);
  res.send(JSON.stringify(response));
});

app.get(url0 + "/list_10block_main", (req, res) => {
  let result = JSON.parse(fs.readFileSync(file1));
  res.send(result);
});

app.get(url0 + "/list_10block_test", (req, res) => {
  let result = JSON.parse(fs.readFileSync(file2));
  res.send(result);
});

app.get(url0 + "/getblockheight", async (req, res) => {
  let _net = req.query.net;
  let _hash = req.query.hash;

  let result = await b_c.getBlockHeight(_net, _hash);
  res.send({ height: result });
});

app.get(url0 + "/list_block", async (req, res) => {
  let _net = req.query.net;
  let _limit = req.query.limit;
  let _offset = req.query.offset;
  let result = await b_l.list_block(_net, _limit, _offset);
  res.send(result);
});

app.get(url0 + "/search_txid", async (req, res) => {
  let _net = req.query.net;
  let _txid = req.query.txid;
  // console.log(_net,(_txid)+'111',"11111")
  let result = await s_t.search_transaction(_net, _txid);
  res.send(result);
});

app.get(url0 + "/search_block", async (req, res) => {
  let _net = req.query.net;
  let _type = req.query.type; //height / hash
  let _value = req.query.value; //height / hash
  let _limit = req.query.limit;
  let _offset = req.query.offset; //start from 0
  // console.log(_net,_type,_value,(_limit),(_offset),'xxxxxxxxxxxxxxxxxxx')
  let result = await d_b.detail_block(_net, _type, _value, _limit, _offset);
  // console.log('result');
  res.send(result);
});

app.get(url0 + "/search_address", async (req, res) => {
  let _net = req.query.net;
  let _address = req.query.address;
  let _page = req.query.page; //start from 1
  let result = await s_a.search_address(_net, _address, _page);
  // console.log(result)
  res.send(result);
});

app.listen(PORT, () =>
  console.log("Bitcoin Browser API listening on port " + PORT + "!")
);
