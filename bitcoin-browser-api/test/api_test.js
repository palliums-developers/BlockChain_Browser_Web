const fetch=require('node-fetch')
var url='http://192.168.1.112:30001/open/1.0/search_address';
function test(){
    let temp;
 
    let option={
        header:{
            method:"POST"
        },
        body:{
            "net":"testnet",
            "address":"n2rXRfQVC8Jc8Nip3AHZK78xna2GCZUUjV"
        }
    }
    let options=JSON.stringify(option);
    console.log(options)
    fetch(url,options)
        .then(res => res.json())
        .then(res => {
            return temp = res
        })
        .catch(e => console.log('error', e));
    console.log(temp);
    return temp;
}

test();