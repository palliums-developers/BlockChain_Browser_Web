import React, { Component } from 'react';
import BTCMainHeader from '../../component/BTCMainHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_BTC'
import './BTCMain_Style.scss';

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

    // this.props.getCurSearchtx({
    //   txid: this.props.match.params.txid
    // })
    this.props.getBTCMainTx('mainnet', this.props.match.params.transaction);
  }
  goToDeal = (txid) => {
    this.props.history.push({ pathname: '/app/BTC_transaction/' + txid })
  }
  goToAddress = (address) => {
    this.props.history.push({ pathname: '/app/BTC_address/' + address })
  }
  goToBlock = (_block) => {
    this.props.history.push({ pathname: '/app/BTC_block/' + _block });
  }
  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }
  onKeyup = (e) => {
    if (e.keyCode === 13) {
      this.getSearch();
    }
  }
  getSearch = () => {
    search_box('mainnet', this.state.iptValue, this.props)
  }

  render() {
    let { BTC_main_txid } = this.props
    // console.log(BTC_main_txid)
    return (
      <div className="BTCMainNetContent">
        <BTCMainHeader back="netTo"></BTCMainHeader>
        <div className="contents contents1">
          <div className="dealBox">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)}placeholder="address、txid、block" />
              <span onClick={this.getSearch}></span>
            </div>
            {BTC_main_txid?
            <div>
            <div className="price">
              <p>
                <i><img src="/img/编组 30@2x.png" /></i>
                <label>BTC MainNet Transaction</label>
              </p>
              <p>{this.props.match.params.transaction}</p>
              <label>Block Hash</label>
              <p className="hash" onClick={() => this.goToBlock(BTC_main_txid.block_hash)}>{BTC_main_txid.block_hash}</p>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Summary</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>Block Height</label><span onClick={() => this.goToBlock(BTC_main_txid.block_height)}>{BTC_main_txid.block_height}</span></p>
                    <p><label>Block Time</label><span>{timeStamp2String(BTC_main_txid.block_time + '000')}</span></p>
                    <p><label>Size</label><span>{BTC_main_txid.size}</span></p>
                    <p><label>Weight</label><span>{BTC_main_txid.weight}</span></p>
                    <p><label>Confirmations</label><span>{BTC_main_txid.confirmations}</span></p>
                  </div>
                  <div className="line"></div>
                  <div className="abstractContent">
                    <p><label>Input</label><span>{BTC_main_txid.inputs_value/1e8} BTC</span></p>
                    <p><label>Output</label><span>{BTC_main_txid.outputs_value/1e8} BTC</span></p>
                  </div>
                </div>
              </div>
              <div className="deal">
                <div className="dealContent1">
                  <div className="dealContents">
                    <p onClick={() => this.goToDeal(BTC_main_txid.hash)}>{BTC_main_txid.hash}</p>
                    <div className="dealAddress">
                      <ul>
                        {
                          BTC_main_txid.inputs && BTC_main_txid.inputs.map((v, i) => {
                            return v.prev_value == 0 ? <p key={i}><span>{v.prev_address}</span></p> :
                              <li key={i}>
                                {
                                  v.prev_value == 0 ? <label>Unparsed address</label> :  <label className="addBlue" onClick={() => this.goToAddress(v.prev_addresses)}>{v.prev_addresses}</label>
                                }
                                <p>{v.prev_value/1e8} BTC</p>
                              </li>
                          })
                        }
                      </ul>
                      {
                        BTC_main_txid && <span></span>
                      }
                      <ul>
                        {
                          BTC_main_txid.outputs && BTC_main_txid.outputs.map((v, i) => {
                            return <li key={i}>
                              {v.value == 0 ? <label>Unparsed address</label> : <label className="addBlue" onClick={() => this.goToAddress(v.addresses)}>{v.addresses}</label>
                              }
                              <p>{v.value/1e8} BTC</p>
                            </li>

                          })
                        }
                      </ul>
                    </div>
                    <div className="descrPrice">
                      <span>Confirmed  {BTC_main_txid.confirmations}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>: <div className="unavailable"><img src='/img/编组 12@2x(1).png'></img><p>Transaction {this.props.match.params.transaction} is not available on BTC MainNet</p></div>}
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
