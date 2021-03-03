import React, { Component } from 'react';
import ViolasHeader from '../../component/violasHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_violas'
import QRcode from 'qrcode.react';
import './violasStyle.scss';
import GetTestCoins from '../../component/GetTestCoins'
import "../../style/getTestCoins.scss"
class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 10,
      offset: 0,
      showMenuBTC: false,
      showMenuViolas: false,
      showMenuStableCoin: false,
      sCoin: [{ id: 'all', name: 'All' }, { id: -1, name: 'vtoken' }],
      current_sCoin: 'All',
      current_module_address: '',
      page: 1,
      pageList: [1],
      showPage: false
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

  componentWillMount() {
    this.props.getCurrency();
    this.props.getViolas_address(this.props.match.params.address, this.state.offset, this.state.limit)
    // this.props.getAddressModule(this.props.match.params.address);
  }
  componentDidMount() {
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    // this.props.getCurDetailAddress({
    //   address: this.props.match.params.address
    // })
    // this.props.getCurDetailsAddress({
    //   address: this.props.match.params.address
    // })
  }
  showMenu = (event) => {
    switch (event) {
      case 'violas':
        this.setState({ showMenuViolas: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
        break;
      case 'BTC':
        this.setState({ showMenuBTC: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
        break;
      case 'All':
        this.setState({ showMenuStableCoin: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
        break;
      case 'Page':
        this.setState({ showPage: true }, () => {
          document.addEventListener('click', this.closeMenu);
        });
        break;
    }
  }
  closeMenu = _ => {
    this.setState({ showMenuBTC: false, showMenuViolas: false, showMenuStableCoin: false, showPage: false }, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }
  holdingCurrencyList() {
    if (this.props.currency.length > 0 && this.state.sCoin.length == 2 && this.props.violas_address.status) {
      let sCoin_temp = this.state.sCoin;
      for (let i in this.props.currency) {
        for (let j in this.props.violas_address.status.module_balande) {
          if (this.props.currency[i].id == this.props.violas_address.status.module_balande[j].id) {
            // console.log(this.props.currency)
            sCoin_temp.push({
              id: this.props.currency[i].id,
              name: this.props.currency[i].name.toLowerCase()
            })
          }
        }
      }
    }
  }
  select_sCoin = (_name) => {
    this.setState({
      current_sCoin: _name
    }, () => {
      if (_name == 'All') {
        this.props.getViolas_address(this.props.match.params.address, this.state.offset, this.state.limit);
        this.setState({ current_module_address: null });
      } else if (_name == 'vtoken') {
        this.props.getViolas_address(this.props.match.params.address, this.state.offset, this.state.limit, -1);
        this.setState({ current_module_address: -1 });
      } else {
        for (let i in this.state.sCoin) {
          if (_name == this.state.sCoin[i].name) {
            this.props.getViolas_address(this.props.match.params.address, this.state.offset, this.state.limit, this.state.sCoin[i].id);
            this.setState({ current_module_address: this.state.sCoin[i].id })
          }
        }
      }
    })

  }
  getModuleBalance = (_address) => {
    if (_address == '0000000000000000000000000000000000000000000000000000000000000000') {
      return this.props.violas_address.status.balance / 1e6;
    } else {
      for (let i in this.props.violas_address.status.module_balande) {
        if (_address == this.props.violas_address.status.module_balande[i].module) {
          return this.props.violas_address.status.module_balande[i].balance / 1e6;
        }
      }
    }
  }
  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }
  module2name(_token_id) {
    // let result = "vtoken";
    if (_token_id == -1) {
      return 'vtoken'
    } else if (_token_id == null || undefined) {
      return 'Null'
    } else {
      for (let i in this.props.currency) {
        if (_token_id == this.props.currency[i].id) {
          return this.props.currency[i].name.toLowerCase();
        }
      }
    }
  }

  returnStatus = (_num) => {
    if (_num == "Executed") {
      return <p style={{ color: "green" }}>Success</p>;
    } else {
      return <p style={{ color: "red" }}>Failed</p>;
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
  changePage = (_event, _page, _module_address) => {
    switch (_event) {
      case 'pre':
        this.setState({ page: this.state.page - 1, offset: this.state.offset - this.state.limit }, () => {
          this.props.getViolas_address(this.props.match.params.address, this.state.offset, this.state.limit, this.state.current_module_address);
        });
        break;
      case 'next':
        this.setState({ page: this.state.page + 1, offset: this.state.offset + this.state.limit }, () => {
          this.props.getViolas_address(this.props.match.params.address, this.state.offset, this.state.limit, this.state.current_module_address);
        });
        break;
      case 'jump':
        this.setState({ page: _page, offset: this.state.limit * (_page - 1) }, () => {
          this.props.getViolas_address(this.props.match.params.address, this.state.offset, this.state.limit, this.state.current_module_address);
        });
        break;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
  countPage = (_total_count) => {
    let result = this.state.pageList;
    let result_max = Math.ceil(_total_count / this.state.limit);
    if (result.length < result_max - 1 && result_max > 2) {
      for (let i = 2; i <= result_max; i++) {
        result.push(i);
      }
    }
  }
  render() {
    let { violas_address } = this.props;
    this.holdingCurrencyList();
    violas_address.status && this.countPage(violas_address.status.sent_tx_count);
    return (
      <div className="violasContent">
        <ViolasHeader back="netTo"></ViolasHeader>
        {
          this.props.getCoins ?
            <GetTestCoins></GetTestCoins> :
            <></>
        }
        <div className="contents contents1">
          <div className="addressBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、version" />
              <span onClick={this.getSearch}></span>
            </div>
            {
              violas_address.status ?
                <div>
                  <div className="price">
                    <div>
                      <p>
                        <i><img src="/img/address@2x.png" /></i>
                        <label>address</label>
                      </p>
                      <p>{this.props.match.params.address}</p>
                      <span className="balance">Banlance: {violas_address.status.balance / 1e6} vtoken</span>
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
                          <p><label>Banlance</label><span>{this.state.current_module_address ? this.getModuleBalance(this.state.current_module_address) : violas_address.status.balance / 1e6} {this.state.current_sCoin == 'All' ? 'vtoken' : this.state.current_sCoin}</span></p>
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
                              return <p key={i} onClick={() => this.select_sCoin(v.name)}>{v.name}</p>
                            })
                            }
                          </div> : (null)}
                        </div>
                        <h2>Recent transactions</h2>
                      </div>
                      <div className="deal">
                        {
                          violas_address.transactions.map((item, index) => {
                            return <div key={index}>
                              <div className="dealContent1 dealContent2">
                                <div className="dealContents">
                                  <div className="pp" onClick={() => this.goToDeal(item.version)}>
                                    <p>Version: {item.version}</p>
                                    <p>Type:{(item.type)}</p>
                                    <p>Gas:{item.gas}</p>
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
                                    {this.returnStatus(item.status)}
                                    <span>{item.amount / 1e6} {this.module2name(item.token_id)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="line"></div>
                            </div>
                          })}
                      </div>
                    </div>
                    <div className="bomSelect">
                      {this.state.page > 1 && <button onClick={() => this.changePage('pre')}>Previous</button>}
                      <div class="dropdown1">
                        <span onClick={() => { this.showMenu('Page') }}>{this.state.page}
                          <i className="arrows">{
                            this.state.showPage ? <img src="/img/weibiaoti1@2x.png" /> : <img src="/img/weibiaoti2备份 2@2x.png" />
                          }</i>
                          {this.state.showPage ? <div className='dropdown-content1'>
                            {this.state.pageList.length > 1 && this.state.pageList.map((v, i) => { return <p key={i} onClick={() => this.changePage('jump', v)}>{v}</p> })}
                          </div> : (null)}
                        </span>
                      </div>
                      {this.state.page < this.state.pageList.length && <button onClick={() => this.changePage('next')}>Next</button>}
                    </div>
                  </div>
                </div> : <div className="unavailable"><img src='/img/编组 12@2x.png'></img><p>Address {this.props.match.params.address} is not available on Violas</p></div>
            }
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
