import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import ViolasHeader from '../../component/violasHeader'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_violas'
import './violasStyle.scss';
import GetTestCoins from '../../component/GetTestCoins'
import "../../style/getTestCoins.scss"
class Violas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            changeBack: 'light',
            list: [],
            limit: 10,
            offset: 0,
            iptValue: ''
        }
    }
    componentWillMount() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
        this.props.getModuleList(this.props.match.params.module_name, this.state.limit, this.state.offset);
        // this.props.getModuleList(this.name2moduleAddress(this.props.match.params.module_name), this.state.limit, this.state.offset);
    }
    componentDidMount() {
        this.props.getCurrency();
    }
    returnStatus = (_num) => {
        if (_num == 4001) {
            return "success"
        } else {
            return "failed"
        }
    }
    getCurValue = (e) => {
        this.setState({
            iptValue: e.target.value
        })
    }
    module2name = (_token_id) => {
        if (this.props.currency) {
            let result = "vtoken";
            for (let i in this.props.currency) {
                if (_token_id == this.props.currency[i].id) {
                    result = this.props.currency[i].name.toLowerCase();
                    break;
                }
            }
            return result
        }
    }
    name2moduleAddress = (_module_name) => {
        let result = '0';
        // let result = '0000000000000000000000000000000000000000000000000000000000000000';
        for (let i in this.props.currency) {
            if (_module_name == this.props.currency[i].name) {
                result = this.props.currency[i].id;
                break;
            }
        }
        return result;
    }
    onKeyup = (e) => {
        if (e.keyCode === 13) {
            this.getSearch();
        }
    }
    getSearch = _ => {
        search_box(this.state.iptValue, this.props)
    }
    loadMore = _ => {
        this.setState({ limit: this.state.limit + 10 })
        this.props.getModuleList(this.name2moduleAddress(this.props.match.params.module_name), this.state.limit + 10, this.state.offset);
    }
    render() {
        // console.log(this.props.module_list.length)
        // this.props.module_list.length === 0 && this.props.getModuleList(this.name2moduleAddress(this.props.match.params.module_name), this.state.limit, this.state.offset);
        return (
            <div className='violasContent'>
                <ViolasHeader back="net"></ViolasHeader>
                {
                    this.props.getCoins ?
                        <GetTestCoins></GetTestCoins> :
                        <></>
                }
                <div className="contents">
                    <div className="mainNet">
                        <div className="searchBox">
                            <h3>{this.props.match.params.module_name}</h3>
                            <div className="form">
                                <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、version" />
                                <span onClick={this.getSearch}></span>
                            </div>
                        </div>
                        <div className='mainContent'>
                            <div className="mainHead">
                                <i><img src="/img/编组 17@2x.png" /></i><span>Last Version</span>
                            </div>
                            <div className="table1">
                                <table bgcolor="rgba(247, 248, 251, 1)">
                                    <thead>
                                        <tr>
                                            <th colSpan="3">Version</th>
                                            <th colSpan="3">Time</th>
                                            <th colSpan="3">Currency</th>
                                            <th colSpan="4">Type</th>
                                            <th colSpan="4">From</th>
                                            <th colSpan="3">Status</th>
                                            <th colSpan="4">To</th>
                                            <th colSpan="3">Amount</th>
                                            <th colSpan="2">Fee</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.module_list && this.props.module_list.map((item, index) => {
                                                return <tr key={index}>
                                                    <td colSpan="3" onClick={() => {
                                                        this.props.history.push('/app/Violas_version/' + item.version)
                                                    }}>{item.version}</td>
                                                    <td colSpan="3">
                                                        {timeStamp2String(item.expiration_time + '000')}
                                                    </td>
                                                    <td colSpan="3">{item.currency.toLowerCase()}</td>
                                                    {/* <td colSpan="3">{this.module2name(item.token_id)}</td> */}
                                                    <td colSpan="4">{(item.type)}</td>
                                                    <td colSpan="4" onClick={() => {
                                                        item.sender &&
                                                            this.props.history.push('/app/Violas_address/' + item.sender)
                                                    }}>{item.sender ? (item.sender).slice(0, 20) + '...' : 'Unparsed address'}</td>
                                                    <td colSpan="3">{this.returnStatus(item.status)}</td>
                                                    <td colSpan="4" onClick={() => {
                                                        item.receiver &&
                                                            this.props.history.push('/app/Violas_address/' + item.receiver)
                                                    }}>{item.receiver ? (item.receiver).slice(0, 20) + '...' : 'Unparsed address'}</td>
                                                    <td colSpan="3">{item.amount / 1e6}</td>
                                                    <td colSpan="2">{item.gas / 1e6}</td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="tableList">
                                {
                                    this.props.module_list && this.props.module_list.map((v, i) => {
                                        return <div className="listContent" key={i}>
                                            <p><label>Version</label><span onClick={() => {
                                                this.props.history.push('/app/Violas_version/' + v.version)
                                            }}>{v.version}</span></p>
                                            <p><label>Time</label><span>{timeStamp2String(v.expiration_time + '000')}</span></p>
                                            <p><label>Currency</label><span onClick={() => {
                                                this.props.history.push('/app/Currency/' + this.module2name(v.token_id).toUpperCase())
                                            }}>{this.module2name(v.token_id)}</span></p>
                                            <p><label>Type</label><span>{(v.type)}</span></p>
                                            <p><label>From</label><span onClick={() => {
                                                v.sender && this.props.history.push('/app/Violas_address/' + v.sender)
                                            }}>{v.sender ? (v.sender).slice(0, 20) + '...' : 'Unparsed address'}</span></p>
                                            <p><label>Status</label><span>{this.returnStatus(v.status)}</span></p>
                                            <p><label>To</label><span onClick={() => {
                                                v.receiver && this.props.history.push('/app/Violas_address/' + v.receiver)
                                            }}>{v.receiver ? (v.receiver).slice(0, 20) + '...' : 'Unparsed address'}</span></p>
                                            <p><label>Amount</label><span>{v.amount}</span></p>
                                            <p><label>Fee</label><span>{v.gas / 1e6}</span></p>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                        <p id="more" onClick={this.loadMore}>Load more</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Violas);
