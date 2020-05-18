import React from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import * as AllActions from '../store/action/list_action'
import { bindActionCreators } from 'redux'

var times = 0;//点击次数
var preClickTime;//上一次点击的时间（毫秒）
var currentClickTime;//当前点击时间
class GetTestCoins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coinAddress: '',
            coinId: 0,
            time:0,
            info: 'Please do not get the currency of this currency repeatedly',
        }
        // this.handleChange = this.handleChange.bind(this)
    }
    componentWillMount() {
        // console.log(this.props.currency)
        // this.props.currency.map(item => {
        //     console.log(item.id)
        // })
    }
    componentDidMount(){
        // console.log(l)

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
    getAgainClick(){
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
        console.log("当前点击次数:" + times);
        
    }
    closeGetCoins() {
        this.props.closeGetCoins();
    }
    render() {
        return (
            <div className='getTestCoins'>
                <div className='container1'>
                    <div className='container2'>
                        <h1>Get test coins</h1>
                        <div className='close' onClick={this.closeGetCoins.bind(this)}>
                            <img src='/img/guanbi-2@2x.png' />
                        </div>
                        <h3>This test coins are only used in test chain</h3>
                        <div className='inLine1'>
                            <h4>Address:</h4>
                            {/* <textarea rows="5" cols="50" autofocus onChange={this.handleChange.bind(this, 'address')} defaultValue={this.state.coinAddress} /> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(GetTestCoins));
