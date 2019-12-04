const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const file1 = './lastblock_main.json';
const file2 = './lastblock_test.json';

const url0='/open/1.0';

var RateLimit = require('express-rate-limit');
var apiLimiter = new RateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3,                // 1000 次
    // delayMs: 0,               // disabled 延迟响应
    // handler: function (req, res) { // 响应格式
    //     res.format({
    //         json: function () {
    //             res.status(429).json(util.error('Too many requests, please try again later.', 429, null));
    //         },
    //         html: function () {
    //             res.status(429).end('Too many requests, please try again later.');
    //         }
    //     });
    // }
});
app.use(url0, apiLimiter);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// const l_b=require('./list_block');

app.get(url0, (req, res) => {
    console.log("welcome come to Bitcoin Browser API");
    res.send('welcome come to Bitcoin Browser 1API');
})

app.post(url0+'/testPost', (req, res) => {
    response =req.body;
    console.log(response);
    res.send(JSON.stringify(response));
})

app.listen(30001, () => console.log('Bitcoin Browser API listening on port 30001!'))

