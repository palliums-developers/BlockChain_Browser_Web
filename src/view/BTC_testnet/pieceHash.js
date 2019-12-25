import React, { Component } from 'react';
import BTCTestHeader from '../../component/BTCTestHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
import './BTCTest_Style.scss';
class PieceHash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2,
      offset: 0
    }
  }
  componentDidMount() {
    let { limit, offset } = this.state
    this.props.getCurListBlock({
      limit: this.state.limit,
      offset: this.state.offset,
    })
    this.props.getCurDetailBlock({
      type: 'hash',
      value: this.props.match.params.hash,
      limit: limit,
      offset: offset
    })
  }

  getSearch = () => {
    search_box('mainnet', this.state.iptValue, this.props)
  }

  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }

  getCurMore = () => {
    this.setState({
      limit: this.state.limit,
      offset: this.state.offset + this.state.limit
    }, () => {
      this.props.getCurDetailBlock({
        type: 'hash',
        value: this.props.match.params.hash,
        limit: this.state.limit + 2,
        offset: this.state.offset
      })
    })
  }

  render() {
    let { abstractDetail, dealsList } = this.props
    return (
      <div className="BTCTestNetContent">
        <BTCTestHeader back="netTo"></BTCTestHeader>
        <div className="contents contents1">
          <div className="pieceHash">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} placeholder="address、txid" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/编组 66@2x.png" /></i>
                <label>块哈希</label>
              </p>
              <p><span>{this.props.match.params.hash}</span></p>
            </div>
            <div className="btn">
              <button onClick={() => this.curBlock('prev', abstractDetail.height)}><img src="/img/编组 7.png" />前一个块</button>
              <button onClick={() => this.curBlock('next', abstractDetail.height)}><img src="/img/编组 2.png" />后一个块</button>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>摘要</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>块高度</label><span>{abstractDetail.height}</span></p>
                    <p><label>时间戳</label><span>{timeStamp2String(abstractDetail.timestamp + '000')}</span></p>
                    <p><label>大小</label><span>{abstractDetail.size} Bytes</span></p>
                    <p><label>Weight</label><span>{abstractDetail.weight}</span></p>
                    <p><label>确认数</label><span>{abstractDetail.confirmations}</span></p>
                  </div>
                  <div className="line"></div>
                  <div className="abstractContent">
                    <p><label>数量</label><span>998</span></p>
                    <p><label>版本</label><span>{abstractDetail.version}</span></p>
                    <p><label>难度</label><span>{abstractDetail.difficulty}</span></p>
                    <p><label>Bits</label><span>{abstractDetail.bits}</span></p>
                    <p><label>Nonce</label><span>{abstractDetail.nonce}</span></p>
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <h2>交易</h2>
                <div className="deal">
                  {
                    dealsList && dealsList.map((item, index) => {
                      return <div key={index}><div className="dealContent1 dealContent2">
                        <div className="dealContents">
                          <p onClick={() => {
                            this.props.history.push('/app/dealbox')
                          }}>{item.txid}</p>
                          <div className="dealAddress">
                            <ul>
                              {
                                item.preaddress.map((v, i) => {
                                  return v.value == 0 ? <p key={i}><span>{v.address}</span></p> :
                                    <li key={i}><label className="addBlue">{v.address}</label><span>{v.value} BTC</span></li>

                                })
                              }
                            </ul>
                            <span></span>
                            <ul>
                              {
                                item.nextaddress.map((v, i) => {
                                  return <li key={i}>{v.value == 0 ? <label>Unparsed address</label> : <label className="addBlue" onClick={() => {
                                    this.props.history.push('/app/addressBox')
                                  }}>{v.address}</label>}<span>{v.value} BTC</span></li>

                                })
                              }
                            </ul>
                          </div>
                          <div className="descrPrice">
                            <span><i></i>{item.output} BTC</span>
                          </div>
                        </div>

                      </div>
                        <div className="line"></div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
            <div className="btns">
              <button onClick={this.getCurMore}>查看更多</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(PieceHash);
