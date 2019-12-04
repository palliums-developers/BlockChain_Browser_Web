import React, { Component } from 'react';
import BTCTestHeader from '../../component/BTCTestHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
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
    this.props.history.push('/app/addressBox/' + address)
  }
  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/dealbox/' + txid
    })
  }
  componentDidMount() {
    this.props.getCurDetailAddress({
      address: this.props.match.params.address
    })
    this.props.getCurDetailsAddress({
      address: this.props.match.params.address
    })
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
    let { addressObj, txs } = this.props
    return (
      <div className="BTCTestNetContent">
        <BTCTestHeader back="netTo"></BTCTestHeader>
        <div className="contents contents1">
          <div className="addressBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} placeholder="address、txid" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/address@2x.png" /></i>
                <label>address</label>
              </p>
              <p>{this.props.match.params.address}</p>
              <span className="balance">Banlance: {addressObj.balance} LBR</span>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>Address</label><span>{this.props.match.params.address}</span></p>
                    <p><label>Banlance</label><span>{addressObj.balance} LBR</span></p>
                    {/* <p><label>Recent transactions</label><span>{txs.length}</span></p> */}
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <h2>Recent transactions</h2>
                <div className="deal">
                  {
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
                    })}
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
