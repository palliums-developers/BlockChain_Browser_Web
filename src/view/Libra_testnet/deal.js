import React, { Component } from 'react';
import LibraHeader from '../../component/libraHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_libra'
import './libraStyle.scss';

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // this.props.getCurSearchtx({
    //   txid: this.props.match.params.txid
    // })
    document.documentElement.scrollTop = document.body.scrollTop = 0;
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

  returnStatus = (_num) => {
    if (_num == 4001) {
      return "success";
    } else {
      return "failed";
    }
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
    let { libra_version } = this.props
    // console.log(dealList)
    return (
      <div className="libraContent">
        <LibraHeader back="netTo"></LibraHeader>
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
                    <p><label>ID</label><span>{libra_version.version}</span></p>
                    <p><label>Type</label><span>{libra_version.type}</span></p>
                    <p><label>From</label><span className="from" onClick={() => {
                      this.props.history.push('/app/Libra_addressBox/' + libra_version.sender)
                    }}>{libra_version.sender}</span></p>
                    <p><label>To</label><span className="to" onClick={() => {
                    libra_version.receiver &&
                      this.props.history.push('/app/Libra_addressBox/' + libra_version.receiver)
                    }}>{libra_version.receiver ? libra_version.receiver : 'Null'}</span></p>
                    <p><label>Value</label><span>{libra_version.amount /1e6} LBR</span></p>
                    <p><label>Time</label><span>{timeStamp2String(libra_version.expiration_time + '000')}</span></p>
                    <p><label>Gas fee</label><span>{libra_version.gas_unit_price}</span></p>
                    <p><label>Gas max</label><span>{libra_version.max_gas_amount}</span></p>
                    <p><label>Sequence nr</label><span>{libra_version.sequence_number}</span></p>
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <p><label>PublicKey</label><span>{libra_version.public_key ? libra_version.public_key : 'Null'}</span></p>
                <p><label>Signature</label><span>{libra_version.signature ? libra_version.signature : 'Null'}</span></p>
                <p><label>Status</label><span>{this.returnStatus(libra_version.status)}</span></p>
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
