import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import ViolasHeader from '../../component/violasHeader'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
import './violasStyle.scss';
class Violas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeBack: 'light',
      list: [],
      limit: 20,
      offset: 0,
      iptValue: ''
    }
  }
  componentDidMount() {
    // this.props.getCurListBlock()
    this.props.getViolas(10,0);
    // console.log(this.props.violas_list);
  }

  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }

  getSearch = () => {
    search_box('mainnet', this.state.iptValue, this.props)
  }

  render() {
    // console.log(this.props.netTableList)
    return (
      <div className='violasContent'>
        <ViolasHeader back="net"></ViolasHeader>
        <div className="contents">
          <div className="mainNet">
            <div className="searchBox">
              <h3>Violas</h3>
              <div className="form">
                <input onChange={(e) => this.getCurValue(e)} placeholder="address、txid" />
                <span onClick={this.getSearch}></span>
              </div>
            </div>
            <div className='mainContent'>
              <div className="mainHead">
                <i><img src="/img/编组 17@2x.png" /></i><span>Last Version</span>
              </div>
              <div className="table">
                <table bgcolor="rgba(247, 248, 251, 1)">
                  <thead>
                    <tr>
                    <th colSpan="2">TXID</th>
                      <th colSpan="3">Time</th>
                      <th colSpan="3">Currency</th>
                      <th colSpan="2">Type</th>
                      <th colSpan="4">From</th>
                      <th colSpan="3">Status</th>
                      <th colSpan="4">To</th>
                      <th colSpan="4">Amount</th>
                      <th colSpan="2">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {
                      this.props.violas_list && this.props.violas_list.map((item, index) => {
                        return <tr key={index}>
                          <td colSpan="2" onClick={() => {
                            this.props.history.push('/app/Libra_dealbox/' + item.version)
                          }}>{item.version}</td>
                          <td colSpan="3">
                            {timeStamp2String(item.expiration_time + '000')}
                          </td>
                        <td colSpan="3">{item.currency}</td>
                          <td colSpan="2">{this.returnType(item.transaction_type)}</td>
                          <td colSpan="4" onClick={() => {
                            this.props.history.push('/app/Libra_addressBox/' + item.sender)
                          }}>{(item.sender).slice(0, 20) + '...'}</td>
                          <td colSpan="3">{this.returnStatus(item.transaction_status)}</td>
                          <td colSpan="4" onClick={() => {
                            this.props.history.push('/app/Libra_addressBox/' + item.receiver)
                          }}>{(item.receiver).slice(0, 20) + '...'}</td>
                          <td colSpan="4">{item.amount}</td>
                          <td colSpan="2">{item.gas_fee}</td>
                        </tr>
                      })
                    } */}
                  </tbody>
                </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(Violas);
