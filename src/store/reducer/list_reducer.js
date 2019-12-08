let initState = {
      netTableList: [],
      abstractDetail: {},
      dealsList: [],
      dealList: {},
      priceList: {},
      frame: 'light',
      iptLength: 0,
      outLength: 0,
      total: 0,
      addressObj: {},
      txs: [],
      libra_testnet: [],
      libra_address: {},
      libra_version: {},
      BTC_main_List: [],
      BTC_main_block: {},
      BTC_main_txid: {},
      BTC_main_address: {},
      BTC_Test_List: [],
      BTC_Test_block: {},
      BTC_Test_txid: {},
      BTC_Test_address: {}
}

let ListReducer = (state = initState, action) => {
      switch (action.type) {
            case 'FRAME':
                  return { ...state, frame: action.data }
            case 'PRICE':
                  return { ...state, priceList: action.data }
            case 'NETTABLES':
                  return { ...state, netTableList: [...action.data] }
            case 'TESTTABLES':
                  return { ...state, testTableList: [...action.data] }
            case 'DETAIL':
                  return { ...state, abstractDetail: action.data }
            case 'SHOWTX':
                  return { ...state, dealsList: [...action.data] }
            case 'DEAL':
                  return { ...state, dealList: action.data }
            case 'LANGTH':
                  return { ...state, iptLength: action.params.iptLength, outLength: action.params.outLength }
            case 'TOTAL':
                  return { ...state, total: action.data }
            case 'LIST':
                  return { ...state, addressObj: action.data }
            case 'TXS':
                  return { ...state, txs: [...action.data] }
            case 'libra_testnet':
                  return { ...state, libra_testnet: [...action.data] }
            case 'libra_address':
                  return { ...state, libra_address: action.data }
            case 'libra_version':
                  return { ...state, libra_version: action.data }
            case 'BTC_main_List':
                  return { ...state, BTC_main_List: [...action.data] }
            case 'BTC_main_block':
                  return { ...state, BTC_main_block: action.data }
            case 'BTC_main_txid':
                  return { ...state, BTC_main_txid: action.data }
            case 'BTC_main_address':
                  return { ...state, BTC_main_address: action.data }
            case 'BTC_Test_List':
                  return { ...state, BTC_Test_List: [...action.data] }
            case 'BTC_Test_block':
                  return { ...state, BTC_Test_block: action.data }
            case 'BTC_Test_txid':
                  return { ...state, BTC_Test_txid: action.data }
            case 'BTC_Test_address':
                  return { ...state, BTC_Test_address: action.data }
            default:
                  return state;
      }
};
export default ListReducer;