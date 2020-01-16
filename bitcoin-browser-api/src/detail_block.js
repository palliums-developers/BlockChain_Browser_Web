const b_c = require('./bitcoin-core-function')

async function detail_block(_net, type, value, limit, offset) {
    // console.log(value,'zzzzzzzzzzzzz')
    if (type == 'height') {
        _value = parseInt(value);
        value = await b_c.getblockhash(_net, _value);
    }
    if (value) {
        console.log(value)
        let block = await b_c.getblock(_net, value);
        if (block) {
            let _limit = parseInt(limit);
            let _offset = parseInt(offset);
            let response = {
                detail: {
                    net: _net,
                    height: block.height,
                    hash: value,
                    timestamp: block.time,
                    size: block.size,
                    weight: block.weight,
                    nTx: block.nTx,
                    confirmations: block.confirmations,
                    version: block.version,
                    difficulty: block.difficulty,
                    bits: block.bits,
                    nonce: block.nonce
                },
                showtx: [],
                limit: _limit,
                offset: _offset
            }
            let block_txid = [];
            if (_offset < block.tx.length && (_limit + _offset) < block.tx.length) {
                for (let i = _offset; i < (_limit + _offset); i++) {
                    // console.log(i)
                    block_txid.push(block.tx[i]);
                }
            } else if (_offset < block.tx.length && (_limit + _offset) > block.tx.length) {
                for (let i = _offset; i < block.tx.length; i++) {
                    block_txid.push(block.tx[i]);
                }
            }
            // console.log(block_txid);
            for (i in block_txid) {
                let temp = await b_c.tx_info(_net, block_txid[i])
                response.showtx.push(temp)
            }
            // response.showtx=await b_c.tx_info();
            // console.log(block_txid,'qqqq');
            // console.log(response.showtx[0].nextaddress);
            // console.log(response)
            return response;
        } else {
            return null
        }
    } else {
        return null
    }
}
// detail_block('testnet','height',591921,2,0);
// detail_block('mainnet','height','999','2',"0");
module.exports = {
    detail_block
}
