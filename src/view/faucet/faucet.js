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
            coinId: 'VLS',
            time: 0,
            info: 'Please do not get the currency of this currency repeatedly',
            showMenuViolas: false,
            showMenuBTC: false,
            getCoins: false,
            auth_key_prefix: '',
            vCoin: [
                { pathname: '/app/Violas', type: 'vtoken' }
            ],
            bCoin: [
                { pathname: '/app/BTC', type: 'BTC' },
                { pathname: '/app/tBTC', type: 'BTC testnet' }
            ],
            VLSCurrency: [],
            Published: [],
            WARN: '',
        };
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    async componentWillMount() {
        await this.props.getCurrency();
        await this.setState({ VLSCurrency: this.getVLS(this.props.currency) });
    }
    async componentDidMount() {
        await this.setState({ coinAddress: this.props.match.params.address })
    }
    getVLS(_currency) {
        let temp = [];
        for (let i = _currency.length - 1; i >= 0; i--) {
            if (_currency[i].name.indexOf('VLS') !== -1) {
                temp.push(_currency[i]);
            }
        }
        return temp;
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
                // console.log(event.target.value)
                break;
            case 'id':
                this.setState({ coinId: event.target.value })
                // console.log(event.target.value)
                break;
        }
    }
    async get_auth_key_prefix() {
        await this.props.getAccountInfo(this.state.coinAddress);
        await this.setState({ auth_key_prefix: this.props.account_info.authentication_key.slice(0, 32) })
    }
    async get_published(_address) {
        await this.props.getPublished(_address);
        await this.setState({ Published: this.props.Published });
    }
    async handleSubmit() {
        await this.setState({ WARN: '' });
        await this.get_published(this.state.coinAddress)
        let match_published = false;
        for (let i = 0; i < this.state.Published.length; i++) {
            if (this.state.coinId == this.state.Published[i]) {
                match_published = true;
                break;
            }
        }
        if (!match_published) {
            await this.setState({ WARN: `This address are not published ${this.state.coinId}` });
            return;
        }

        if (this.getAgainClick()) {
            if (this.state.coinAddress.length !== 32) {
                this.props.getWarning('Invalid Address')
            } else {
                await this.get_auth_key_prefix();
                await this.props.getCoinsFun(this.state.coinAddress, this.state.coinId, this.state.auth_key_prefix);
            }
        };
    }
    //判断是否重复点击
    getAgainClick() {
        if (times == 0) {
            preClickTime = new Date().getTime();//首次点击的时间
            times++
            console.log('0')
            return true;
        }
        currentClickTime = new Date().getTime();
        console.log(currentClickTime - preClickTime)
        if ((currentClickTime - preClickTime) < 3000) {//如果是3秒内重复点击
            this.props.getWarning('Please do not get the currency of this currency repeatedly')
            preClickTime = currentClickTime;
            console.log('f')
            return false;
        } else {
            times++
            preClickTime = currentClickTime;
            console.log('t')
            return true;
        }
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
                                {/* {
                                    this.props.currency.length > 0 ?
                                        this.props.currency.map((item) => {
                                            return <option value={item.id}>{item.name}</option>
                                        }) :
                                        <></>
                                } */}
                                {
                                    this.state.VLSCurrency.length > 0 ?
                                        this.state.VLSCurrency.map((item) => {
                                            return <option value={item.id}>{item.name}</option>
                                        }) :
                                        <></>
                                }
                            </select>
                        </div>
                        <div className='submit'>
                            <button ref="btn" onClick={this.handleSubmit.bind(this)}>Submit</button>
                            {
                                this.props.info === 'You get test coins successful' ?
                                    <p style={{ color: 'green' }}>{this.props.info}</p> :
                                    <p>{this.props.info}<br/>{this.state.WARN}</p>
                            }
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