const Client = require('bitcoin-core');

var host_uk = "51.140.241.96";
var host_chongqing="94.191.95.240";
var username = 'palliums';
var password_uk = 'qazpl,';
var host_zhangjiakou = "47.92.49.137";
var password_zhangjiakou = 'qpalzm'
const mainnet = new Client({
    network: 'mainnet',
    host: host_zhangjiakou,
    port: 8332,
    username: username,
    password: password_zhangjiakou,
});
const testnet = new Client({
    network: 'testnet',
    host: host_chongqing,
    port: 18332,
    username: username,
    password: password_uk,
});

var client;
function whichnet(net){
    switch(net){
        case 'testnet':
            client=testnet;
            break;
        default:
            client=mainnet;
    }
}

async function getblockcount(net) {
    whichnet(net)
    return client.getBlockCount()
        .then(res => {
            console.log(res)
            return res
        })
        .catch(e => console.log('error', e));
}
getblockcount('testnet');

