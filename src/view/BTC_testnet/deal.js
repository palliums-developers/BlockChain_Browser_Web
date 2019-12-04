import React, { Component } from 'react';
import BTCTestHeader from '../../component/BTCTestHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
import './BTCTest_Style.scss';
class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getBTCTestTx('testnet', this.props.match.params.transaction);
    // this.props.getCurSearchtx({
    //   txid: this.props.match.params.txid
    // })
  }
  goToDeal = (txid) => {
    this.props.history.push({ pathname: '/app/tBTC_transaction/' + txid })
  }
  goToAddress = (address) => {
    this.props.history.push({ pathname: '/app/tBTC_address/' + address })
    // this.props.history.push({
    //   pathname: '/app/addressBox',
    //   state: {
    //     address: address
    //   }
    // })
  }
  goToBlock = (_block) => {
    this.props.history.push({ pathname: '/app/tBTC_block/' + _block });
  }
  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }

  getSearch = () => {
    search_box('testnet', this.state.iptValue, this.props)
  }

  render() {
    let { dealList, BTC_Test_txid } = this.props
    // console.log(BTC_Test_txid)
    return (
      <div className="BTCTestNetContent">
        <BTCTestHeader back="netTo"></BTCTestHeader>
        <div className="contents contents1">
          <div className="dealBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} placeholder="address、txid" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/编组 30@2x.png" /></i>
                <label>BTC TestNet Transaction</label>
              </p>
              <p>{this.props.match.params.transaction}</p>
              <label>Block Hash</label>
              <p className="hash" onClick={() => this.goToBlock(BTC_Test_txid.blockhash)}>{BTC_Test_txid.blockhash}</p>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    {/* <p><label>ID</label><span>{dealList._id}</span></p>
                    <p><label>From</label><span className="from" onClick={() => {
                      this.props.history.push('/app/addressBox/' + dealList.from)
                    }}>{dealList.from}</span></p>
                    <p><label>To</label><span className="to" onClick={() => {
                      this.props.history.push('/app/addressBox/' + dealList.to)
                    }}>{dealList.to}</span></p>
                    <p><label>Value</label><span>{dealList.value} LBR</span></p>
                    <p><label>Time</label><span>{timeStamp2String(dealList.time + '000')}</span></p>
                    <p><label>Gas price</label><span>{dealList.gas_price}</span></p>
                    <p><label>Gas max</label><span>{dealList.gas_max}</span></p>
                    <p><label>Gas used</label><span>{dealList.gas_used}</span></p>
                    <p><label>Sequence nr</label><span>{dealList.seq_nr}</span></p> */}
                    <p><label>Block Height</label><span onClick={() => this.goToBlock(BTC_Test_txid.blockheight)}>{BTC_Test_txid.blockheight}</span></p>
                    <p><label>Time</label><span>{timeStamp2String(BTC_Test_txid.timestamp + '000')}</span></p>
                    <p><label>Size</label><span>{BTC_Test_txid.size}</span></p>
                    <p><label>Weight</label><span>{BTC_Test_txid.weight}</span></p>
                    <p><label>Confirmations</label><span>{BTC_Test_txid.confirmations}</span></p>
                  </div>
                </div>
              </div>

              {/* <div className="blockHeightDeal">
                <p><label>senderPublicKey</label><span>{dealList.senderPublicKey}</span></p>
                <p><label>senderSignature</label><span>{dealList.senderSignature}</span></p>
                <p><label>signedTxnHash</label><span>{dealList.signedTxnHash}</span></p>
                <p><label>stateRootHash</label><span>{dealList.stateRootHash}</span></p>
                <p><label>eventRootHash</label><span>{dealList.eventRootHash}</span></p>
                <p><label>rawTxnBytes</label><span>{dealList.rawTxnBytes}</span></p>
              </div> */}
                            <div className="deal">
                <div className="dealContent1">
                  <div className="dealContents">
                    <p onClick={() => this.goToDeal(BTC_Test_txid.txid)}>{BTC_Test_txid.txid}</p>
                    <div className="dealAddress">
                      <ul>
                        {
                          BTC_Test_txid.preaddress && BTC_Test_txid.preaddress.map((v, i) => {
                            return v.value == 0 ? <p key={i}><span>{v.address}</span></p> :
                              <li key={i}>
                                {
                                  v.value == 0 ? <label>地址解析失败</label> : v.address.length == 34 ? <label className="addBlue" onClick={() => this.goToAddress(v.address)}>{v.address}</label> : <label>{v.address}</label>
                                }
                                <span>' '{v.value} BTC</span></li>
                          })
                        }
                      </ul>
                      {/* <span> >>>>>>>>>>>>>>>>> </span> */}
                      <ul>
                        {
                          BTC_Test_txid.nextaddress && BTC_Test_txid.nextaddress.map((v, i) => {
                            return <li key={i}>
                              {v.value == 0 ? <label>地址解析失败</label> : v.address.length == 34 ? <label className="addBlue" onClick={() => this.goToAddress(v.address)}>{v.address}</label> : <label>{v.address}</label>
                              }
                              <span>{v.value} BTC</span>
                            </li>

                          })
                        }
                      </ul>
                    </div>
                    <div className="descrPrice">
                      <span>Confirmed {BTC_Test_txid.confirmations}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state.ListReducer
}

const mapDispatchToProps = dispatch => bindActionCreators(AllActions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Deal);
