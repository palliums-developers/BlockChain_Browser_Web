let Axios=require('axios')
let violas_list=async _=>{
    let result=await Axios.get("http://52.27.228.84:4001/violas/recent_txn?limit=10&offset=0")
    .then(res=>{return res})
    console.log(result.data.data)
    return result;
}
violas_list()