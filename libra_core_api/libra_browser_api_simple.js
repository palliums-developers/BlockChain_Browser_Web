const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fetch=require('node-fetch')
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
 
app.get('/recent_txn',function(req,res,next){
    fetch('https://api.librachecker.com/recent_txn')
    .then(res1=>res1.json())
    .then(res1=>res.send(res1))
})

app.get('/txn_info',function(req,res,next){
    let id=req.query.id;
    fetch('https://api.librachecker.com/txn_info/?_id='+id)
    .then(res1=>res1.json())
    .then(res1=>res.send(res1))
})

app.get('/address_info',function(req,res,next){
    let address=req.query.address;
    fetch('https://api.librachecker.com/address_info/?address='+address)
    .then(res1=>res1.json())
    .then(res1=>res.send(res1))
})

app.get('/recent_txn1',function(req,res,next){
  fetch('https://api.librablock.io/version?limit=20&offset=0')
  .then(res1=>res1.json())
  .then(res1=>res.send(res1))
})

app.get('/txn_info1',function(req,res,next){
  let id=req.query.id;
  fetch('https://api.librablock.io/version/'+id)
  .then(res1=>res1.json())
  .then(res1=>res.send(res1))
})

app.get('/address_info1',function(req,res,next){
  let address=req.query.address;
  fetch('https://api.librablock.io/account/'+address)
  .then(res1=>res1.json())
  .then(res1=>res.send(res1))
})

app.get('/address_detail1',function(req,res,next){
  let address=req.query.address;
  let limit=req.query.limit;
  let offset=req.query.offset;
  fetch('https://api.librablock.io/version?limit='+limit+'&offset='+offset+'&address='+address)
  .then(res1=>res1.json())
  .then(res1=>res.send(res1))
})

app.listen(10080, function () {
  console.log('CORS-enabled web server listening on port 10080')
})
