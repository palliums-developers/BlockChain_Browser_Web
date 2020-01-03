import React, { Component } from 'react';
import ViolasHeader from '../../component/violasHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_violas'
import './violasStyle.scss';
class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // this.props.getCurSearchtx({
    //   txid: this.props.match.params.txid
    // })
    this.props.getViolas_version(this.props.match.params.version);
    this.props.getCurrency();
  }
  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/dealbox/' + txid
    })
  }
  goToAddress = (address) => {
    this.props.history.push({
      pathname: '/app/addressBox',
      state: {
        address: address
      }
    })
  }

  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }

  returnStatus = (_num) => {
    if (_num == 4001) {
      return "success";
    } else {
      return "failed";
    }
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
  onKeyup = (e) => {
    if (e.keyCode === 13) {
      this.getSearch();
    }
  }
  getSearch = () => {
    search_box(this.state.iptValue, this.props)
  }

  render() {
    let { violas_version } = this.props
    return (
      <div className="violasContent">
        <ViolasHeader back="netTo"></ViolasHeader>
        <div className="contents contents1">
          <div className="dealBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、version" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <div>
                <p>
                  <i><img src="/img/编组 30@2x.png" /></i>
                  <label>Transaction</label>
                </p>
                <p>{this.props.match.params.txid}</p>
              </div>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>Version</label><span>{violas_version.version}</span></p>
                    <p><label>Type</label><span>{violas_version.type}</span></p>
                    <p><label>From</label><span className="from" onClick={() => {
                      violas_version.sender &&
                        this.props.history.push('/app/Violas_address/' + violas_version.sender)
                    }}>{violas_version.sender ? violas_version.sender : 'Null'}</span></p>
                    <p><label>To</label><span className="to" onClick={() => {
                      violas_version.receiver &&
                        this.props.history.push('/app/Violas_address/' + violas_version.receiver)
                    }}>{violas_version.receiver ? violas_version.receiver : 'Null'}</span></p>
                    <p><label>Value</label><span>{violas_version.amount / 1e6} {this.module2name(violas_version.module_address)}</span></p>
                    <p><label>Time</label><span>{timeStamp2String(violas_version.expiration_time + '000')}</span></p>
                    <p><label>Gas fee</label><span>{violas_version.gas_unit_price / 1e6}</span></p>
                    <p><label>Gas max</label><span>{violas_version.max_gas_amount / 1e6}</span></p>
                    <p><label>Sequence nr</label><span>{violas_version.sequence_number}</span></p>
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <p><label>PublicKey</label><span>{violas_version.public_key}</span></p>
                <p><label>Signature</label><span>{violas_version.signature}</span></p>
                <p><label>Status</label><span>{this.returnStatus(violas_version.status)}</span></p>
                <p><label>Data</label><span>{violas_version.data ? violas_version.data : 'Null'}</span></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Deal);
