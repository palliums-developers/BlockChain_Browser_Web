const b_c=require('./bitcoin-core-function')

async function list_some_block_info(net,limit,offset){
    let hash_list=await b_c.listLastBlock(net,limit,offset);
    // console.log(hash_list);
    let simple_hash_list=[];
    for(let i=0;i<hash_list.length;i++){
        let block = await b_c.getblock(net,hash_list[i]);
        simple_hash_list.push({
            height:block.height,
            size:block.size,
            profit:await b_c.getBlockHashProfit(net,hash_list[i]),
            timestamp:block.time,
            hash:hash_list[i]
        })
    }
    // console.log(simple_hash_list);
    return simple_hash_list;
}

async function list_block(net,limit1,offset1){
    let price =await b_c.USDprice();
    let response={
        price:{
            last:price.last,
            daily:price.changes.percent.day
        },
        net:net,
        block:await list_some_block_info(net,limit1,offset1),
        limit:limit1,
        offset:offset1
    }
    // console.log(response,'list_block');
    return response;
}

// list_block(20,0);
module.exports={
    list_block
}

// var start = Date.now();
// console.log('开始行走江湖,当前时间:' + start);
// setInterval(function () {
//     console.log(Date.now() - start + '毫秒后,突然杀出一位好汉!\r\n');
// }, 2000);