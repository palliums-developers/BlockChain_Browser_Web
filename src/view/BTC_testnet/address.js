import React, { Component } from 'react';
import BTCTestHeader from '../../component/BTCTestHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_BTC'
import QRcode from 'qrcode.react'
import './BTCTest_Style.scss';
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2,
      offset: 0
    }
  }
  goToAddress = (address) => {
    this.props.history.push('/app/tBTC_address/' + address)
  }
  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/tBTC_transaction/' + txid
    })
  }
  componentDidMount() {
    // this.props.getCurDetailAddress({
    //   address: this.props.match.params.address
    // })
    // this.props.getCurDetailsAddress({
    //   address: this.props.match.params.address
    // })
    this.props.getBTCTestAddress('testnet', this.props.match.params.address, 1)
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
    let { addressObj, txs, BTC_Test_address } = this.props
    return (
      <div className="BTCTestNetContent">
        <BTCTestHeader back="netTo"></BTCTestHeader>
        <div className="contents contents1">
          <div className="addressBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、txid、block" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/address@2x.png" /></i>
                <label>BTC Test Address</label>
              </p>
              <p>{this.props.match.params.address}</p>
              <div className="code">
                <QRcode value={this.props.match.params.address}></QRcode>
              </div>

            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>Address</label><span>{this.props.match.params.address}</span></p>
                    <p><label>Banlance</label><span>{BTC_Test_address.data && BTC_Test_address.data.balance} Sat</span></p>
                    <p><label>Total Receive</label><span>{BTC_Test_address.data && BTC_Test_address.data.received} Sat</span></p>
                    <p><label>Tx Count</label><span>{BTC_Test_address.data && BTC_Test_address.data.tx_count}</span></p>
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <h2>Recent transactions</h2>
                <div className="deal">
                  {/* {
                    txs && txs.map((item, index) => {
                      return <div key={index}><div className="dealContent1 dealContent2">
                        <div className="dealContents">
                          <div className="pp" onClick={() => this.goToDeal(item.version)}>
                            <p>ID: {item.version}</p>
                            <p>Time: {timeStamp2String(item.expirationTime + '000')}</p>
                          </div>
                          <div className="dealAddress">
                            <ul>

                              <li><label onClick={() => this.goToAddress(item.from)} className="addBlue">{item.from}</label></li>
                            </ul>
                            <span></span>
                            <ul>
                              <li><label onClick={() => this.goToAddress(item.to)} className="addBlue">{item.to}</label></li>
                            </ul>
                          </div>
                          <div className="descrPrice">
                            <span><i></i>{item.value} LBR</span>
                          </div>
                        </div>

                      </div>
                        <div className="line"></div>
                      </div>
                    })} */}
                  <div className="dealContent1">
                    <div className="dealContents">
                      {BTC_Test_address.list && BTC_Test_address.list.list.map((v, i) => {
                        return (
                          <div>
                            <p onClick={() => this.goToDeal(v.hash)}>{v.hash}</p>
                            <div className="dealAddress">
                              <ul>
                                {
                                  // v.inputs.map((vint, iint) => {
                                  //   return vint.input == 0 ? <p key={iint}><span>{vint.address}</span></p> :
                                  //     <li key={iint}>
                                  //       {
                                  //         vint.value == 0 ? <label>地址解析失败</label> : vint.address.length == 34 ? <label className="addBlue" onClick={() => this.goToAddress(vint.address)}>{vint.address}</label> : <label>{vint.address}</label>
                                  //       }
                                  //       <span>{vint.value} BTC</span></li>
                                  v.inputs.map((v1, i1) => {
                                    return v1.prev_addresses && v1.prev_addresses[i1] ? <label><p className="addBlue" onClick={() => this.goToAddress(v1.prev_addresses)} key={i1}>{v1.prev_addresses + ' '}</p>
                                      <p>{v1.prev_value + " Sat"}</p></label> : <label className={v1.prev_value ? "addBlue" : ''}>Unparsed address<p>0 Sat</p></label>
                                  })
                                }
                              </ul>
                              <span></span>
                              <ul>
                                {
                                  // v.output.map((vout, iout) => {
                                  //   return <li key={i}>
                                  //     {v.value == 0 ? <label>地址解析失败</label> : v.address.length == 34 ? <label className="addBlue" onClick={() => this.goToAddress(v.address)}>{v.address}</label> : <label>{v.address}</label>
                                  //     }
                                  //     <span>{v.value} BTC</span>
                                  //   </li>

                                  // })
                                  v.outputs.map((v2, i2) => {
                                    return v2.addresses && v2.addresses[i2] ? <label><p className="addBlue" onClick={() => this.goToAddress(v2.addresses)} key={i2}>{v2.addresses}</p><p>{v2.value + " Sat"}</p></label> : <label className={v2.prev_value ? "addBlue" : ''}>Unparsed address<p>0 Sat</p></label>
                                  })
                                }
                              </ul>
                            </div>
                            <div className="descrPrice">
                              <span>Confirmed {v.confirmations}</span>
                            </div>
                          </div>
                        )
                      })}

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

export default connect(mapStateToProps, mapDispatchToProps)(Address);
