// 头部
import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as AllActions from '../store/action/list_action'
import { bindActionCreators } from 'redux'
class BTCTestHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vCoin: [
        { pathname: '/app/Currency/VTOKEN', type: 'vtoken' }
      ],
      bCoin: [
        { pathname: '/app/BTC', type: 'BTC' },
        { pathname: '/app/tBTC', type: 'BTC testnet' }
      ]
    }
  }
  componentWillMount() {
    this.props.getCurrency();
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
              <span>Violas</span>
              <div className='dropdown-content1'>
                {
                  this.state.vCoin.map((v, i) => {
                    return <NavLink
                      to={v.pathname}
                      activeClassName='active' key={i}>{v.type}</NavLink>
                  })
                }
              </div>
            </div>

            <div className='dropdown2'>
              <span>BTC</span>
              <div className='dropdown-content2'>
                {
                  this.state.bCoin.map((v, i) => {
                    return <NavLink
                      to={v.pathname}
                      activeClassName='active' key={i}>{v.type}</NavLink>
                  })
                }
              </div>
            </div>
            <NavLink to='/app/Libra'>Libra</NavLink>
          </div>
        </div>
        {/* {
            this.props.back == 'net' ? <div className="bgLogo">
           <img src="/img/编组 9@2x.png" />
          </div> : null
          } */}

      </header>
    );
  }
}
const mapStateToProps = state => {
  return state.ListReducer
}

const mapDiapatchToProps = diapatch => bindActionCreators(AllActions, diapatch)

export default connect(mapStateToProps, mapDiapatchToProps)(withRouter(BTCTestHeader));
