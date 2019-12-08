import React, { Component } from 'react';
import ViolasHeader from '../../component/violasHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
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
    this.props.get_libra_version(this.props.match.params.txid)
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

  returnStatus=(_num)=>{
    if(_num==4001){
      return "success";
    }else{
      return "failed";
    }
  }

  getSearch = () => {
    search_box('mainnet', this.state.iptValue, this.props)
  }

  render() {
    let { libra_version } = this.props
    // console.log(dealList)
    return (
      <div className="violasContent">
        <ViolasHeader back="netTo"></ViolasHeader>
        <div className="contents contents1">
          <div className="dealBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} placeholder="address、txid" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/编组 30@2x.png" /></i>
                <label>Transaction</label>
              </p>
              <p>{this.props.match.params.txid}</p>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>ID</label><span>{libra_version.version}</span></p>
                    <p><label>From</label><span className="from" onClick={() => {
                      this.props.history.push('/app/Libra_addressBox/' + libra_version.sender)
                    }}>{libra_version.sender}</span></p>
                    <p><label>To</label><span className="to" onClick={() => {
                      this.props.history.push('/app/Libra_addressBox/' + libra_version.receiver)
                    }}>{libra_version.receiver}</span></p>
                    <p><label>Value</label><span>{libra_version.amount} LBR</span></p>
                    <p><label>Time</label><span>{timeStamp2String(libra_version.expiration_time + '000')}</span></p>
                    <p><label>Gas fee</label><span>{libra_version.gas_fee}</span></p>
                    <p><label>Gas max</label><span>{libra_version.gas_max}</span></p>
                    <p><label>Sequence nr</label><span>{libra_version.sequence_number}</span></p>
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <p><label>PublicKey</label><span>{libra_version.public_key}</span></p>
                <p><label>Signature</label><span>{libra_version.signature}</span></p>
                  <p><label>Status</label><span>{this.returnStatus(libra_version.transaction_status)}</span></p>
                {/* <p><label>signedTxnHash</label><span>{libra_version.signedTxnHash}</span></p>
                <p><label>stateRootHash</label><span>{libra_version.stateRootHash}</span></p>
                <p><label>eventRootHash</label><span>{libra_version.eventRootHash}</span></p>
                <p><label>rawTxnBytes</label><span>{libra_version.rawTxnBytes}</span></p> */}

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