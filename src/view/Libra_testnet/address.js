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
      limit: 10,
      offset: 0,
      page: 1,
      pageList: [1],
      showPage: false
    }
  }
  goToAddress = (address) => {
    this.props.history.push('/app/Diem_addressBox/' + address)
  }
  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/Diem_dealbox/' + txid
    })
  }
  componentDidMount() {
    // this.props.getCurDetailAddress({
    //   address: this.props.match.params.address
    // })
    // this.props.getCurDetailsAddress({
    //   address: this.props.match.params.address
    // })
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.get_libra_address(this.props.match.params.address, this.state.offset, this.state.limit);
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
    if (_num == 4001) {
      return <p style={{ color: 'green' }}>success</p>
    } else {
      return <p style={{ color: 'red' }}>failed</p>
    }
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
  changePage = (_event, _page) => {
    switch (_event) {
      case 'pre':
        this.setState({ page: this.state.page - 1, offset: this.state.offset - this.state.limit }, () => { this.props.get_libra_address(this.props.match.params.address, this.state.offset, this.state.limit); })
        break;
      case 'next':
        this.setState({ page: this.state.page + 1, offset: this.state.offset + this.state.limit }, () => { this.props.get_libra_address(this.props.match.params.address, this.state.offset, this.state.limit); })
        break;
      case 'jump':
        this.setState({ page: _page, offset: this.state.limit * (_page - 1) }, () => { this.props.get_libra_address(this.props.match.params.address, this.state.offset, this.state.limit); })
        break;
    }
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
  showPageMenu = () => {
    this.setState({ showPage: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  closeMenu = _ => {
    this.setState({ showPage: false }, () => {
      document.removeEventListener('click', this.closeMenu);
    })
  }
  render() {
    let { libra_address } = this.props;
    libra_address.status && this.countPage(libra_address.status.sent_tx_count)
    return (
      <div className="libraContent">
        <LibraHeader back="netTo"></LibraHeader>
        <div className="contents contents1">
          <div className="addressBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、version" />
              <span onClick={this.getSearch}></span>
            </div>
            {JSON.stringify(libra_address)!='{}' ?
              <div>
                <div className="price">
                  <div>
                    <p>
                      <i><img src="/img/address@2x.png" /></i>
                      <label>address</label>
                    </p>
                    <p>{this.props.match.params.address}</p>
                    <span className="balance">Banlance: {libra_address.status.balance / 1e6} LBR</span>
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
                        <p><label>Banlance</label><span>{libra_address.status.balance / 1e6} LBR</span></p>
                        {/* <p><label>Recent transactions</label><span>{txs.length}</span></p> */}
                      </div>
                    </div>
                  </div>
                  <div className="blockHeightDeal">
                    <h2>Recent transactions</h2>
                    <div className="deal">
                      {
                        libra_address.transactions && libra_address.transactions.map((item, index) => {
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
                                    <li><label onClick={() => item.sender && this.goToAddress(item.sender)} className="addBlue">{item.sender ? item.sender : 'Null'}</label></li>
                                  </ul>
                                  <span></span>
                                  <ul>
                                    <li><label onClick={() => item.receiver && this.goToAddress(item.receiver)} className="addBlue">{item.receiver ? item.receiver : 'Null'}</label></li>
                                  </ul>
                                </div>
                                <div className="descrPrice">
                                  {this.returnStatus(item.status)}
                                  <span><i></i>{item.amount / 1e6} LBR</span>
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
                      <span onClick={() => { this.showPageMenu() }}>{this.state.page}
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
              </div> : <div className="unavailable"><img src='/img/编组 12@2x.png'></img><p>Address {this.props.match.params.address} is not available on Libra</p></div>}
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
