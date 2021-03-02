import React, { Component } from 'react';
import BTCTestHeader from '../../component/BTCTestHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_BTC'
import './BTCTest_Style.scss';
class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    this.props.getBTCTestTx(this.props.match.params.transaction);
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
  onKeyup = (e) => {
    if (e.keyCode === 13) {
      this.getSearch();
    }
  }
  getSearch = () => {
    search_box('testnet', this.state.iptValue, this.props)
  }

  render() {
    let { dealList, BTC_Test_txid } = this.props
    // console.log(BTC_Test_txid)
    // console.log(BTC_Test_txid)
    return (
      <div className="BTCTestNetContent">
        <BTCTestHeader back="netTo"></BTCTestHeader>
        <div className="contents contents1">
          <div className="dealBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、txid、block" />
              <span onClick={this.getSearch}></span>
            </div>
            {BTC_Test_txid ? <div>
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
                      <p><label>Time</label><span>{timeStamp2String(BTC_Test_txid.time + '000')}</span></p>
                      <p><label>BlockTime</label><span>{timeStamp2String(BTC_Test_txid.blocktime + '000')}</span></p>
                      <p><label>Value In</label><span>{BTC_Test_txid.valueIn}</span></p>
                      <p><label>Value out</label><span>{BTC_Test_txid.valueOut}</span></p>
                      <p><label>Fee</label><span>{BTC_Test_txid.fees}</span></p>
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
                            BTC_Test_txid.vin && BTC_Test_txid.vin.map((v, i) => {
                              return v.value == 0 ? <p key={i}><span>{v.addresses}</span></p> :
                                <label key={i}>
                                  {
                                    v.value == 0 ? <label>Unparsed address</label> : v.addresses[0].length >= 26 ? <label className="addBlue" onClick={() => this.goToAddress(v.addresses)}>{v.addresses}</label> : <label>{v.addresses}</label>
                                  }
                                  <p>{v.value}BTC</p></label>
                            })
                          }
                        </ul>
                        <span></span>
                        <ul>
                          {
                            BTC_Test_txid.vout && BTC_Test_txid.vout.map((v, i) => {
                              return <li key={i}>
                                {v.value == 0 ? <label>Unparsed address</label> : v.scriptPubKey.addresses[0].length >= 26 ? <label className="addBlue" onClick={() => this.goToAddress(v.scriptPubKey.addresses)}>{v.scriptPubKey.addresses}</label> : <label>{v.scriptPubKey.addresses}</label>
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
            </div> : <div className="unavailable"><img src='/img/编组 12@2x(1).png'></img><p>Transaction {this.props.match.params.transaction} is not available on BTC TestNet</p></div>}
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
