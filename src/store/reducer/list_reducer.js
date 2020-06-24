let initState = {
      getCoins: false,
      getCoinsFuns: {},
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
      violas_list: [],
      violas_version: {},
      violas_address: {},
      libra_testnet: [],
      libra_address: {},
      libra_version: {},
      BTC_main_List: [],
      BTC_main_block: {},
      BTC_main_block_tx: [],
      BTC_main_txid: {},
      BTC_main_address: {},
      BTC_main_address_tx: {},
      BTC_Test_List: [],
      BTC_Test_block: {},
      BTC_Test_txid: {},
      BTC_Test_address: {},
      currency: [],
      module_list: [],
      violas_address_holding_module: [],
      account_info: {},
      info: ''
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
            case 'violas_list':
                  return { ...state, violas_list: [...action.data] }
            case 'violas_version':
                  return { ...state, violas_version: action.data }
            case 'violas_address':
                  return { ...state, violas_address: action.data }
            case 'violas_address_module':
                  return { ...state, violas_address_module: action.data }
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
            case 'BTC_main_block_tx':
                  return { ...state, BTC_main_block_tx: [...action.data] }
            case 'BTC_main_txid':
                  return { ...state, BTC_main_txid: action.data }
            case 'BTC_main_address':
                  return { ...state, BTC_main_address: action.data }
            case 'BTC_main_address_tx':
                  return { ...state, BTC_main_address_tx: action.data }
            case 'BTC_Test_List':
                  return { ...state, BTC_Test_List: [action.data][0] }
            case 'BTC_Test_block':
                  return { ...state, BTC_Test_block: action.data }
            case 'BTC_Test_txid':
                  return { ...state, BTC_Test_txid: action.data }
            case 'BTC_Test_address':
                  return { ...state, BTC_Test_address: action.data }
            case 'currency':
                  return { ...state, currency: [...action.data.currencies] }
            case 'violas_address_holding_module':
                  return { ...state, violas_address_holding_module: [...action.data] }
            case 'module_list':
                  return { ...state, module_list: [...action.data] }
            case 'GETCOINS':
                  return { ...state, getCoins: action.data }
            case 'account_info':
                  return { ...state, account_info: action.data }
            // case 'getCoinsFun':
            //       return { ...state, getCoinsFuns: action.data }
            case 'WARN':
                  return { ...state, info: action.data }
            default:
                  return state;
      }
};
export default ListReducer;