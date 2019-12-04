import React, { Component } from 'react';
import ViolasHeader from '../../component/violasHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
import QRcode from 'qrcode.react';
import './violasStyle.scss';
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2,
      offset: 0
    }
  }
  goToAddress = (address) => {
    this.props.history.push('/app/Libra_addressBox/' + address)
  }
  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/Libra_dealbox/' + txid
    })
  }
  componentDidMount() {
    // this.props.getCurDetailAddress({
    //   address: this.props.match.params.address
    // })
    // this.props.getCurDetailsAddress({
    //   address: this.props.match.params.address
    // })
    this.props.get_libra_address(this.props.match.params.address)
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
    let { libra_address } = this.props
    return (
      <div className="violasContent">
        <ViolasHeader back="netTo"></ViolasHeader>
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
              <span className="balance">Banlance: {libra_address.balance} LBR</span>
              <QRcode value={this.props.match.params.address}></QRcode>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>Address</label><span>{this.props.match.params.address}</span></p>
                    <p><label>Banlance</label><span>{libra_address.balance} LBR</span></p>
                    {/* <p><label>Recent transactions</label><span>{txs.length}</span></p> */}
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <h2>Recent transactions</h2>
                <div className="deal">
                  {
                    libra_address.transactions && libra_address.transactions.map((item, index) => {
                      return <div key={index}><div className="dealContent1 dealContent2">
                        <div className="dealContents">
                          <div className="pp" onClick={() => this.goToDeal(item.version)}>
                            <p>ID: {item.version}</p>
                            <p>Time: {timeStamp2String(item.expiration_time + '000')}</p>
                          </div>
                          <div className="dealAddress">
                            <ul>

                              <li><label onClick={() => this.goToAddress(item.sender)} className="addBlue">{item.sender}</label></li>
                            </ul>
                            <span></span>
                            <ul>
                              <li><label onClick={() => this.goToAddress(item.receiver)} className="addBlue">{item.receiver}</label></li>
                            </ul>
                          </div>
                          <div className="descrPrice">
                            <span><i></i>{item.amount} LBR</span>
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
