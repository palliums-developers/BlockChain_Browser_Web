import React, { Component } from 'react';
import LibraHeader from '../../component/libraHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_libra'
import QRcode from 'qrcode.react';
import './libraStyle.scss';
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
    document.documentElement.scrollTop=document.body.scrollTop=0;
    this.props.get_libra_address(this.props.match.params.address)
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
    search_box(this.state.iptValue, this.props)
  }
  returnStatus = (_num) => {
    if (_num == 4017) {
      return "success"
    } else {
      return "failed"
    }
  }
  render() {
    let { libra_address } = this.props;
    return (
      <div className="libraContent">
        <LibraHeader back="netTo"></LibraHeader>
        <div className="contents contents1">
          <div className="addressBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、version" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <div>
                <p>
                  <i><img src="/img/address@2x.png" /></i>
                  <label>address</label>
                </p>
                <p>{this.props.match.params.address}</p>
                <span className="balance">Banlance: {libra_address.balance /10/10/10/10/10/10} LBR</span>
              </div>
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
                    <p><label>Banlance</label><span>{libra_address.balance /10/10/10/10/10/10} LBR</span></p>
                    {/* <p><label>Recent transactions</label><span>{txs.length}</span></p> */}
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <h2>Recent transactions</h2>
                <div className="deal">
                  {
                    libra_address.length > 0 && libra_address.map((item, index) => {
                      return <div key={index}>
                        <div className="dealContent1 dealContent2">
                          <div className="dealContents">
                            <div className="pp" onClick={() => this.goToDeal(item.version)}>
                              <p>Version: {item.version}</p>
                              <p>Type:{item.type}</p>
                              <p>Gas:{item.gas}</p>
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
                              <p>{this.returnStatus(item.status)}</p>
                              <span><i></i>{item.amount /10/10/10/10/10/10} LBR</span>
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
