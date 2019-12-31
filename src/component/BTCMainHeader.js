// 头部
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as AllActions from '../store/action/list_action'
import { bindActionCreators } from 'redux'
class BTCMainHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuViolas: false,
      showMenuBTC: false,
      vCoin: [
        { pathname: '/app/Currency/VTOKEN', type: 'vtoken' }
      ],
      bCoin: [
        { pathname: '/app/BTC', type: 'BTC' },
        { pathname: '/app/tBTC', type: 'BTC testnet' }
      ]
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  componentWillMount() {
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
    }
  }
  closeMenu = _ => {
    this.setState({ showMenuBTC: false, showMenuViolas: false }, () => {
      document.removeEventListener('click', this.closeMenu)
    })
  }
  addCurrencyList() {
    if (this.props.currency.length > 0 && this.state.vCoin.length == 1) {
      let vCoin_temp = this.state.vCoin;
      for (let i in this.props.currency) {
        vCoin_temp.push({
          pathname: '/app/Currency/' + this.props.currency[i].name,
          type: this.props.currency[i].name.toLowerCase()
        })
      }
    }
  }
  render() {
    this.addCurrencyList();
    return (
      <header className={this.props.back == 'net' ? "netBack" : "netToBack"}>
        <div className="head">
          <div className="logo">
            <NavLink to='/app/Violas'><img src="/img/编组 15@2x.png" /></NavLink>
          </div>
          <div className="navList">
            <div className='dropdown1'>
              <span onClick={() => this.showMenu('violas')}>Violas<i className="arrows">{
                this.state.showMenuViolas ? <img src="/img/weibiaoti1备份 2@2x.png" /> : <img src="/img/weibiaoti1 2@2x.png" />
              }</i></span>
              <div className='dropdown-content1'>
                {this.state.showMenuViolas ? (this.state.vCoin.map((v, i) => {
                  return <NavLink to={v.pathname} activeClassName='active' key={i}>{v.type}</NavLink>
                })) : (null)
                }
              </div>
            </div>
            <div className='dropdown2'>
              <span onClick={() => this.showMenu('BTC')}>BTC<i className="arrows">{
                this.state.showMenuBTC ? <img src="/img/weibiaoti1备份 2@2x.png" /> : <img src="/img/weibiaoti1 2@2x.png" />
              }</i></span>
              <div className='dropdown-content2'>
                {this.state.showMenuBTC ? (this.state.bCoin.map((v, i) => {
                  return <NavLink to={v.pathname} activeClassName='active' key={i}>{v.type}</NavLink>
                })) : (null)
                }
              </div>
            </div>
            <NavLink to='/app/Libra'>Libra</NavLink>
          </div>
        </div>
        {
          this.props.back == 'net' ? <div className="bgLogo">
            <img src="/img/位图 2@2x.png" />
          </div> : null
        }

      </header>
    );
  }
}
const mapStateToProps = state => {
  return state.ListReducer
}

const mapDiapatchToProps = diapatch => bindActionCreators(AllActions, diapatch)

export default connect(mapStateToProps, mapDiapatchToProps)(withRouter(BTCMainHeader));
