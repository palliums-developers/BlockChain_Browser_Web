# 区块链浏览器 API
## 服务器API地址
前缀: ```https://xxx.xxx.xxx.xxx:xxxx/api```

完整的API地址为: 前缀 + 具体接口路径
## 接口调用说明
- 如果参数格式是 ```JSON``` : 提交request请求时必须添加header头: ```Content-Type:application/json```
- 所有的接口的返回形式都统一为：
    - 正常返回
      ```
        {
            "code":200,
            "message":"ok",
            "data":某种类型的数据，如字符串，数字，数组，对象等
        }
      ```
    - 错误返回
      ```
        {
            "code":具体错误码，
            "message":"具体错误信息字符串"
        }
      ```

## 接口说明

### list_20block_main
#### get方法 用于首页列出主节点的最新20个块的简单信息
```
res
{
    "price":{
        "last":9586.38,
        "daily":-1.53
        },
    "block":[
        {
            "height":592235,
            "size":1177901,
            "profit":12.75458561,
            "timestamp":1567057971,
            "hash":"000000000000000000171e670e39f31f2dd988d5e6e079341219f56dd1e9f6b5"
        },{
            "height":592234,
            "size":633127,
            "profit":12.59624016,
            "timestamp":1567057128,
            "hash":"00000000000000000013ee11103971431395c3256b4393f648a5ac5b5d3deb82"
        },
        ......
        {
            "height":592216,
            "size":463331,
            "profit":12.58920272,
            "timestamp":1567047703,
            "hash":"00000000000000000019d73173ea1cb5ba053e3d2d200ff26b6876488dd67af6"
        }
    ],
    "net":"mainnie",
    "limit":20,
    "offset":0
}
```

### list_20block_test
#### get方法 用于首页列出测试节点的最新20个块的简单信息
```
res
{
    "price":{
        "last":9586.38,
        "daily":-1.53
        },
    "block":[
        {
            "height":592235,
            "size":1177901,
            "profit":12.75458561,
            "timestamp":1567057971,
            "hash":"000000000000000000171e670e39f31f2dd988d5e6e079341219f56dd1e9f6b5"
        },{
            "height":592234,
            "size":633127,
            "profit":12.59624016,
            "timestamp":1567057128,
            "hash":"00000000000000000013ee11103971431395c3256b4393f648a5ac5b5d3deb82"
        },
        ......
        {
            "height":592216,
            "size":463331,
            "profit":12.58920272,
            "timestamp":1567047703,
            "hash":"00000000000000000019d73173ea1cb5ba053e3d2d200ff26b6876488dd67af6"
        }
    ],
    "net":"test",
    "limit":20,
    "offset":0
}
```

### list_block 
#### post方法 用于首页展示当前时间点的块详情
```
req
{   
    net:mainnet/testnet
    limit:2,
    offset:0
}

res
{
    price:{
        last:12000
        daily:-10
    },
    block:[
        {
            height:58000,
            size:1111,
            profit:222,
            timestamp:xxxxx,
            hash:0000000
        },
        {
            height:58000,
            size:1111,
            profit:222,
            timestamp:xxxxx,
            hash:0000000
        }
    ],
    net:mainnet
    limit:2,
    offset2
}
```

### detail_block
#### 点击或者搜索块的hash/height 展示块的详情与列出交易
```
req
{
    net:mainnet/testnet
    type:height/hash,
    value:xxxxx，
    limit:2,
    offset:0
}

res
{ 
    detail:{ 
        net: 'mainnet',
        height: 591921,
        hash:
        '0000000000000000001b5d4fac3ae76f6de72146b1be217ef4130736d26aca5b',
        timestamp: 1566874008,
        size: 621730,
        weight: 2293798,
        confirmations: 322,
        version: 536870912,
        difficulty: 10183488432890,
        bits: '171ba3d1',
        nonce: 2269186953 
     },
  showtx:[ 
      { 
            txid:'81645e9855aa2a624d9b09f28e13e80500280ae6dfe2ba82e40f9855177e22ed',
            blockhash:'0000000000000000001b5d4fac3ae76f6de72146b1be217ef4130736d26aca5b',
            blockheight: 591921,
            timestamp: 1566874008,
            size: 200,
            weight: 692,
            confirmations: 322,
            input: 0,
            output: 12.59835808,
            preaddress: [
                { value: 0, address: 'coinbase' }
            ],
            nextaddress: [
                { value: 12.59835808,address: '3KF9nXowQ4asSGxRRzeiTpDjMuwM2nypAN' },
                { value: 0, address: 'Unable to decode output address' }
            ],
            fee: -12.59835808 
       },
    .....
       ],
  limit: 3,
  offset: 0 
}
```
### search_address
#### 点击或者搜索地址 展示地址的详情，列出该地址参与的交易
```
req
{
    net:mainnet/testnet
    address:n2rXRfQVC8Jc8Nip3AHZK78xna2GCZUUjV,
}
res
{ 
    net:testnet
    address: 'n2rXRfQVC8Jc8Nip3AHZK78xna2GCZUUjV',
    balance: 1000011,
    received: 1000011,
    amount: 1,
    txs:[ 
            { 
                txid:'8bea7b2e4ec803a1cdd2c30424744e42c4cefc85d5e16c6eae09b21eccf5a850',
                blockhash:'0000000000000150247797d6bc4c80ae79236d6e61f170b1a4ed88f328f276d1',
                blockheight: 1576121,
                timestamp: 1566919719,
                size: 2289,
                weight: 9156,
                confirmations: 221,
                input: 0.11260916999999998,
                output: 0.11000011000000001,
                preaddress: [
                    { value: 0.0078, address: 'motETWVNiNZRezAfA6LQcrFa4YYE5zSnj5' },
                    { value: 0.00000546,address: 'mfmqkQYFeDuEzuaFjmB8UKRN15ook5NhcY' },
                   .....
                ],
                nextaddress: [
                    { value: 0.1, address: 'n2z759sXytyPV5wxy94foDyPQHc5LK27sW' },
                    { value: 0.01000011, address: 'n2rXRfQVC8Jc8Nip3AHZK78xna2GCZUUjV' }
                ],
                fee: 0.0026090599999999686 
            } 
       ]
}
```
### searchtx
#### 搜索txid 展示交易详情，上下地址及BTC数额
```
req:
{
    net:testnet
    txid:xxx
}
res:
{
  net: 'mainnet',
  txid:'9892ed15ed749f787e1e18fe6f0a79738dd4b76b93623209e18b7989a6ae5d84',
  blockhash: '0000000000000000001b5d4fac3ae76f6de72146b1be217ef4130736d26aca5b',
  blockheight: 591921,
  timestamp: 1566874008,
  size: 288,
  weight: 1152,
  confirmations: 322,
  input: 9.28808221,
  output: 9.287082210000001,
  preaddress:[ 
      { value: 9.28808221, address: '17A16QmavnUfCW11DAApiJxp7ARnxN5pGX' } 
      ],
  nextaddress:[ 
      { value: 0.099676,address: '3NhqZZY7zNbR3mjC2fog7dVb9HRLo4Sapp' },
     { value: 0.13332286,address: '37AavuatDeXwx6kqntETzSQZTnzbkh9SoE' },
     { value: 9.05408335,address: '17A16QmavnUfCW11DAApiJxp7ARnxN5pGX' } 
     ],
  fee: 0.0009999999999994458
}
```
