let initState = {
    netTableList:[],
    abstractDetail:{},
    dealsList:[],
    dealList:{},
    priceList:{},
    frame:'light',
    iptLength:0,
    outLength:0,
    total:0,
    addressObj:{},
    txs:[]
  }
  
let ListReducer = (state = initState, action) => {
    switch (action.type) { 
        case 'FRAME':
             return {...state,frame:action.data}
        case 'PRICE':
             return {...state,priceList:action.data}
        case 'NETTABLES':
             return {...state,netTableList:[...action.data]}
        case 'TESTTABLES':
             return {...state,testTableList:[...action.data]}
        case 'DETAIL':
             return {...state,abstractDetail:action.data}
        case 'SHOWTX':
              return {...state,dealsList:[...action.data]}
        case 'DEAL':
              return {...state,dealList:action.data}
        case 'LANGTH':
              return {...state,iptLength:action.params.iptLength,outLength:action.params.outLength}
        case 'TOTAL':
              return {...state,total:action.data}
        case 'LIST':
              return {...state,addressObj:action.data}
        case 'TXS':
              return {...state,txs:[...action.data]}
        default:
            return state;
    }
  };
  export default ListReducer;