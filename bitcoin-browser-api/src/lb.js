const b_l = require('./list_block')
const fs = require('fs');
const file1 = '../log/lastblock_main.json';
const file2 = '../log/lastblock_test.json';

// async function test(){
//     let temp = await b_l.list_block(1,0);
//     // let count = await b_c.getblockcount();
//     // console.log(count)
//     console.log(temp)
//     return temp;
// }

setInterval(async function(){
    let main = await b_l.list_block('mainnet',10,0);
    let test = await b_l.list_block('testnet',10,0);
    fs.writeFileSync(file1,JSON.stringify(main));
    fs.writeFileSync(file2,JSON.stringify(test));
},60000);

// b_l.list_block('mainnet',10,0);
// b_l.list_block('testnet',10,0);

