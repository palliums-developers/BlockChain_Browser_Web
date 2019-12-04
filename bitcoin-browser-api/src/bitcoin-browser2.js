const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const file1 = '../log/lastblock_main.json';
const file2 = '../log/lastblock_test.json';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const l_b=require('./list_block');
const url0='/open/1.0';

app.get(url0, (req, res) => res.send('welcome come to Bitcoin Browser API'))

app.post(url0+'/testPost', (req, res) => {
    response =req.body;
    console.log(response);
    res.send(JSON.stringify(response));
})

app.get(url0+'/list_20block_main',(req,res)=>{
    let result = JSON.parse(fs.readFileSync(file1));
    res.send(result);
})

app.get(url0+'/list_20block_test',(req,res)=>{
    let result = JSON.parse(fs.readFileSync(file2));
    res.send(result);
})

app.post(url0+'/getblockheight',(req,res)=>{
    let result=req.body;
    const b_c=require('./bitcoin-core-function');
    (async function(){
        let heights=await b_c.getBlockHeight(result.net,result.hash);
        let ress={
            height:heights
        }
        res.send(ress);
    })()
})

// app.post(url0+'/list_block',(req,res)=>{
//     request=req.body;
//     // console.log(requ)
//     const b_l=require('./list_block');
//     async function run(){
//         let ress=b_l.list_block(request.net,request.limit,request.offset);
//         return ress
//     }
//     (async function(){
//         let runn=await run();
//         res.send(runn);
//     })()
// })

app.post(url0+'/list_block',(req,res)=>{
    request=req.body;
    // console.log(requ)
    (async function run(){
        const b_l=require('./list_block');
        let ress=await b_l.list_block(request.net,request.limit,request.offset);
        res.send(ress);
    })()
})

// app.post(url0+'/searchtx',(req,res)=>{
//     request=req.body;
//     async function run(){
//         const s_t=require('./search_transaction');
//         let ress=s_t.search_transaction(request.net,request.txid);
//         return ress
//     }
//     (async function(){
//         let runn=await run();
//         res.send(runn);
//     })()
// })
app.post(url0+'/searchtx',(req,res)=>{
    request=req.body;
    (async function(){
        const s_t=require('./search_transaction');
        let ress=await s_t.search_transaction(request.net,request.txid);
        res.send(ress);
    })()
})

// app.post(url0+'/detail_block',(req,res)=>{
//     request=req.body;
//     // res.send(b_b.detail_block(response.type,response.value,response.limit,response.offset));
//     async function run(){
//         const d_b=require('./detail_block');
//         let ress=d_b.detail_block(request.net,request.type,request.value,request.limit,request.offset);
//         return ress
//     }
//     (async function(){
//         let runn=await run();
//         res.send(runn);
//     })()
// })
app.post(url0+'/detail_block',(req,res)=>{
    request=req.body;
    // res.send(b_b.detail_block(response.type,response.value,response.limit,response.offset));
    (async function(){
        const d_b=require('./detail_block');
        let ress=await d_b.detail_block(request.net,request.type,request.value,request.limit,request.offset);
        res.send(ress);
    })()
})

// app.post(url0+'/search_address',(req,res)=>{
//     request=req.body;
//     // res.send(b_b.detail_block(response.type,response.value,response.limit,response.offset));
//     async function run(){
//         const s_a=require('./search_address');
//         let ress=s_a.search_address(request.net,request.address);
//         return ress
//     }
//     (async function(){
//         let runn=await run();
//         res.send(runn);
//     })()
// })
app.post(url0+'/search_address',(req,res)=>{
    request=req.body;
    // res.send(b_b.detail_block(response.type,response.value,response.limit,response.offset));
    (async function run(){
        const s_a=require('./search_address');
        let ress=await s_a.search_address(request.net,request.address);
        res.send(ress);
    })()
})
app.listen(30001, () => console.log('Bitcoin Browser API listening on port 30001!'))

