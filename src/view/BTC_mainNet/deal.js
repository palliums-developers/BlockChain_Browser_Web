import React, { Component } from 'react';
import BTCMainHeader from '../../component/BTCMainHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_BTC'
import './BTCMain_Style.scss';

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

    // this.props.getCurSearchtx({
    //   txid: this.props.match.params.txid
    // })
    this.props.getBTCMainTx('mainnet', this.props.match.params.transaction);
  }
  goToDeal = (txid) => {
    this.props.history.push({ pathname: '/app/BTC_transaction/' + txid })
  }
  goToAddress = (address) => {
    this.props.history.push({ pathname: '/app/BTC_address/' + address })
  }
  goToBlock = (_block) => {
    this.props.history.push({ pathname: '/app/BTC_block/' + _block });
  }
  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }

  getSearch = () => {
    search_box('mainnet', this.state.iptValue, this.props)
  }

  render() {
    let { dealList, BTC_main_txid } = this.props
    // console.log(this.props)
    return (
      <div className="BTCMainNetContent">
        <BTCMainHeader back="netTo"></BTCMainHeader>
        <div className="contents contents1">
          <div className="dealBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} placeholder="address、txid" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/编组 30@2x.png" /></i>
                <label>BTC MainNet Transaction</label>
              </p>
              <p>{this.props.match.params.transaction}</p>
              <label>Block Hash</label>
              <p className="hash" onClick={() => this.goToBlock(BTC_main_txid.blockhash)}>{BTC_main_txid.blockhash}</p>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    {/* <p><label>TXID</label><span>{BTC_main_txid.txid}</span></p>
                    <p><label>From</label><span className="from" onClick={() => {
                      this.props.history.push('/app/BTC_address/' + dealList.from)
                    }}>{dealList.from}</span></p>
                    <p><label>To</label><span className="to" onClick={() => {
                      this.props.history.push('/app/addressBox/' + dealList.to)
                    }}>{dealList.to}</span></p> */}
                    <p><label>Block Height</label><span onClick={() => this.goToBlock(BTC_main_txid.blockheight)}>{BTC_main_txid.blockheight}</span></p>
                    <p><label>Time</label><span>{timeStamp2String(BTC_main_txid.timestamp + '000')}</span></p>
                    <p><label>Size</label><span>{BTC_main_txid.size}</span></p>
                    <p><label>Weight</label><span>{BTC_main_txid.weight}</span></p>
                    <p><label>Confirmations</label><span>{BTC_main_txid.confirmations}</span></p>
                  </div>
                  <div className="line"></div>
                  <div className="abstractContent">
                    <p><label>Input</label><span>{BTC_main_txid.input} Sat</span></p>
                    <p><label>Output</label><span>{BTC_main_txid.output} Sat</span></p>
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
                    <p onClick={() => this.goToDeal(BTC_main_txid.txid)}>{BTC_main_txid.txid}</p>
                    <div className="dealAddress">
                      <ul>
                        {
                          BTC_main_txid.preaddress && BTC_main_txid.preaddress.map((v, i) => {
                            return v.value == 0 ? <p key={i}><span>{v.address}</span></p> :
                              <li key={i}>
                                {
                                  v.value == 0 ? <label>地址解析失败</label> : v.address.length == 34 ? <label className="addBlue" onClick={() => this.goToAddress(v.address)}>{v.address}</label> : <label>{v.address}</label>
                                }
                                <p>{v.value} BTC</p>
                              </li>
                          })
                        }
                      </ul>
                      {
                        BTC_main_txid && <span></span>
                      }
                      
                      <ul>
                        {
                          BTC_main_txid.nextaddress && BTC_main_txid.nextaddress.map((v, i) => {
                            return <li key={i}>
                              {v.value == 0 ? <label>地址解析失败</label> : v.address.length == 34 ? <label className="addBlue" onClick={() => this.goToAddress(v.address)}>{v.address}</label> : <label>{v.address}</label>
                              }
                              <p>{v.value} BTC</p>
                            </li>

                          })
                        }
                      </ul>
                    </div>
                    <div className="descrPrice">
                      <span>确认数 {BTC_main_txid.confirmations}</span>
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
