import React, { Component } from 'react';
import ViolasHeader from '../../component/violasHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_violas'
import QRcode from 'qrcode.react';
import './violasStyle.scss';
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2,
      offset: 0,
      showMenuBTC: false,
      showMenuViolas: false,
      showMenuStableCoin: false,
      sCoin: [{ address: 'all', name: 'All' }, { address: '0000000000000000000000000000000000000000000000000000000000000000', name: 'vtoken' }],
      current_sCoin:'All'
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  goToAddress = (address) => {
    address && this.props.history.push('/app/violas_address/' + address)
  }
  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/Violas_version/' + txid
    })
  }
  componentDidMount() {
    // this.props.getCurDetailAddress({
    //   address: this.props.match.params.address
    // })
    // this.props.getCurDetailsAddress({
    //   address: this.props.match.params.address
    // })
    this.props.getViolas_address(this.props.match.params.address)
    this.props.getCurrency();
  }
  showMenu = (event) => {
    // this.setState({ showMenuViolas: true });
    switch (event) {
      case 'violas':
        this.setState({ showMenuViolas: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
        break;
      case 'BTC':
        this.setState({ showMenuBTC: true }, () => {
          document.addEventListener('click', this.closeMenu);
        })
        break;
      case 'All':
        this.setState({ showMenuStableCoin: true }, () => {
          document.addEventListener('click', this.closeMenu);
        })
    }
  }
  closeMenu = _ => {
    this.setState({ showMenuBTC: false, showMenuViolas: false, showMenuStableCoin: false }, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }
  holdingCurrencyList() {
    if (this.props.currency.length > 0 && this.state.sCoin.length == 2) {
      let sCoin_temp = this.state.sCoin;
      let holding=[];
      for (let i in this.props.currency) {
        sCoin_temp.push({
          address: this.props.currency[i].address,
          name: this.props.currency[i].name.toLowerCase()
        })
      }
    }
  }
  select_sCoin=(_address)=>{
    this.setState({

      current_sCoin: _address
    })
    console.log(_address)
  }
  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }
  module2name = (_module_address) => {
    let result = "vtoken";
    for (let i in this.props.currency) {
      if (_module_address == this.props.currency[i].address) {
        result = this.props.currency[i].name.toLowerCase();
        break;
      }
    }
    return result
  }
  returnStatus = (_num) => {
    if (_num == 4001) {
      return "success"
    } else {
      return "failed"
    }
  }
  onKeyup = (e) => {
    if (e.keyCode === 13) {
      this.getSearch();
    }
  }
  getSearch = () => {
    search_box(this.state.iptValue, this.props)
  }
  returnType = (_num) => {
    switch (_num) {
      case 0:
        return "vtoken p2p";
      case 1:
        return "publish";
      case 2:
        return "stable coin p2p"
    }
  }
  render() {
    let { violas_address } = this.props;
    this.holdingCurrencyList();
    return (
      <div className="violasContent">
        <ViolasHeader back="netTo"></ViolasHeader>
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
                <span className="balance">Banlance: {violas_address.balance / 1e6} vtoken</span>
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
                    <p><label>Banlance</label><span>{violas_address.balance / 1e6} vtoken</span></p>
                    {/* <p><label>Recent transactions</label><span>{txs.length}</span></p> */}
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <div className='recList'>
                  <div className='dropdown1'>
                    <span onClick={() => this.showMenu('All')}>{this.state.current_sCoin}<i className="arrows">{
                      this.state.showMenuStableCoin ? <img src="/img/weibiaoti1@2x.png" /> : <img src="/img/weibiaoti2备份 2@2x.png" />
                    }</i></span>
                    {this.state.showMenuStableCoin ? <div className='dropdown-content1'>
                      {this.state.sCoin.map((v, i) => {
                        return <p key={i} onClick={()=>this.select_sCoin(v.name)}>{v.name}</p>
                      }) 
                    }
                    </div>: (null)}
                  </div>
                  <h2>Recent transactions</h2>
                </div>
                <div className="deal">
                  {
                    violas_address.transactions && violas_address.transactions.map((item, index) => {
                      return <div key={index}>
                        <div className="dealContent1 dealContent2">
                          <div className="dealContents">
                            <div className="pp" onClick={() => this.goToDeal(item.version)}>
                              <p>Version: {item.version}</p>
                              <p>Type:{this.returnType(item.type)}</p>
                              <p>Time: {timeStamp2String(item.expiration_time + '000')}</p>
                            </div>
                            <div className="dealAddress">
                              <ul>
                                <li><label onClick={() => this.goToAddress(item.sender)} className="addBlue">{item.sender ? item.sender : 'Null'}</label></li>
                              </ul>
                              <span></span>
                              <ul>
                                <li><label onClick={() => this.goToAddress(item.receiver)} className="addBlue">{item.receiver ? item.receiver : 'Null'}</label></li>
                              </ul>
                            </div>
                            <div className="descrPrice">
                              <p>{this.returnStatus(item.status)}</p>
                              <span>{item.amount / 1e6} {this.module2name(item.module_address)}</span>
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
