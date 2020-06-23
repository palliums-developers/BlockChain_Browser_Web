import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as AllActions from '../../store/action/list_action';
import { bindActionCreators } from 'redux';

import './faucet.scss'

var times = 0;//点击次数
var preClickTime;//上一次点击的时间（毫秒）
var currentClickTime;//当前点击时间

class Faucet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coinAddress: '',
            coinId: 0,
            time: 0,
            info: 'Please do not get the currency of this currency repeatedly',
            showMenuViolas: false,
            showMenuBTC: false,
            getCoins: false,
            vCoin: [
                { pathname: '/app/Violas', type: 'vtoken' }
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
    componentDidMount() {
        this.setState({coinAddress:this.props.match.params.address})
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
    handleChange(_type, event) {
        switch (_type) {
            case 'address':
                this.setState({ coinAddress: event.target.value });
                console.log(event.target.value)
                break;
            case 'id':
                this.setState({ coinId: event.target.value })
                console.log(event.target.value)
                break;
        }
    }
    handleSubmit() {
        this.getAgainClick()

        // let couldSubmit=false;
        if (this.state.coinAddress.length !== 32) {
            this.props.getWarning('Invalid Address')
        } else {
            this.props.getCoinsFun(this.state.coinAddress, this.state.coinId)

        }
    }
    //判断是否重复点击
    getAgainClick() {
        if (times == 0) {
            preClickTime = new Date().getTime();//首次点击的时间
            times++
            return;
        }
        currentClickTime = new Date().getTime();
        if ((currentClickTime - preClickTime) < 2000) {//如果是3秒内重复点击
            this.props.getWarning('Please do not get the currency of this currency repeatedly')
            preClickTime = currentClickTime;
            return;
        }
        times++
        preClickTime = currentClickTime;
    }
    render() {
        this.addCurrencyList();
        return (
            <div className='getTestCoins'>
                <div className='getTestCoins_header'>
                    <div className='header_contain'>
                        <div className='getTestCoins_logo'>
                            <img className='logo' src='/img/new_logo_purple.png' />
                            {/* <NavLink to='/app/Violas'><img className='logo' src='/img/new_logo_purple.png' /></NavLink> */}
                        </div>
                        <div className="navList">
                            <div className='dropdown1'>
                                <span onClick={() => this.showMenu('violas')}>Violas<i className="arrows">{
                                    this.state.showMenuViolas ? <img src="/img/weibiaoti1 2@2x.png" /> : <img src="/img/weibiaoti1备份 2@2x.png" />
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
                                    this.state.showMenuBTC ? <img src="/img/weibiaoti1 2@2x.png" /> : <img src="/img/weibiaoti1备份 2@2x.png" />
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
                </div>
                <div className='container1'>
                    <div className='container2'>
                        <h1>Get test coins</h1>
                        <h3>This test coins are only used in test chain</h3>
                        <div className='inLine1'>
                            <h4>Address:</h4>
                            <input autofocus onChange={this.handleChange.bind(this, 'address')} defaultValue={this.state.coinAddress} />
                        </div>
                        <div className='inLine2'>
                            <h4>Amount:</h4>
                            <h5>0.001</h5>
                            <select onChange={this.handleChange.bind(this, 'id')}>
                                {
                                    this.props.currency.length > 0 ?
                                        this.props.currency.map((item) => {
                                            return <option value={item.id}>{item.name}</option>
                                        }) :
                                        <></>
                                }
                            </select>
                        </div>
                        <div className='submit'>
                            <button ref="btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
                            <p>{this.props.info}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return state.ListReducer
}

const mapDispatchToProps = dispatch => bindActionCreators(AllActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Faucet);