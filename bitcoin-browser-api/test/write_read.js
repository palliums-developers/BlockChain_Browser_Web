const fs = require('fs');
const file = './lastblock.json';
let result = JSON.parse(fs.readFileSync(file));
console.log(result)

// var aaa=require('./lastblock.json')
// console.log(aaa);
// aaa.paral

let last = {
    price: {
        last: 10164.9,
        daily: -0.2
    },
    block: [{
        height: 592099,
        size: 904357,
        profit: 12.65882533,
        timestamp: 1566980181,
        hash: '0000000000000000000c648995909013922da6d01728e014c6cb0de094370b33'
    }],
    limit: 1,
    offset: 0
}
// fs.writeFileSync(file,JSON.stringify(last));