import React, { Component } from 'react';
import ViolasHeader from '../../component/violasHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
import './violasStyle.scss';
class BlockHeight1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2,
      offset: 0
    }
  }

  componentDidMount() {
    let { limit, offset } = this.state
    this.props.getCurListBlock()

    this.props.getCurDetailBlock({
      net: 'testnet',
      type: 'height',
      value: this.props.match.params.block * 1,
      limit: limit,
      offset: offset
    })
  }

  goToAddress = (address) => {
    this.props.history.push({
      pathname: '/app/addressBox1',
      state: {
        address: address
      }
    })
  }

  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/dealbox1/' + txid
    })
  }

  curBlock = (type) => {
    let prev = this.props.match.params.block - 1;
    if (type == 'prev') {
      if (prev == 1) {
        prev = 1
        this.props.history.push('/app/blockHeight/' + prev)
      } else if (prev > 0) {
        this.props.history.push('/app/blockHeight/' + prev)
      }
      this.forceUpdate()
    } else if (type == 'next') {
      prev = (this.props.match.params.block) * 1 + 1;
      if (prev <= this.props.testTableList.length) {
        this.props.history.push('/app/blockHeight/' + prev)
      } else {
        return;
      }
      this.forceUpdate()
    }
  }

  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }

  getSearch = () => {
    search_box('testnet', this.state.iptValue, this.props)
  }

  getCurMore = () => {
    this.setState({
      limit: this.state.limit,
      offset: this.state.offset + this.state.limit
    }, () => {
      this.props.getCurDetailBlock({
        net: 'testnet',
        type: 'height',
        value: this.props.match.params.block * 1,
        limit: this.state.limit + 2,
        offset: this.state.offset
      })
    })
  }

  render() {
    let { abstractDetail, dealsList, total } = this.props
    return (
      <div className="violasContent">
        <ViolasHeader back="netTo"></ViolasHeader>
        <div className="contents contents1">
          <div className="blockHeight">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} placeholder="地址、txid、高度或哈希" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/编组 66@2x.png" /></i>
                <label>块</label>
                <span>{this.props.match.params.block}</span>
              </p>
              <p><label>块哈希</label><span>{abstractDetail.hash}</span></p>
            </div>
            <div className="btn">
              <button onClick={() => this.curBlock('prev')}><img src="/img/编组 7.png" />前一个块</button>
              <button onClick={() => this.curBlock('next')}><img src="/img/编组 2.png" />后一个块</button>
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
                    <p><label>数量</label><span>{abstractDetail.number}</span></p>
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
                          <p onClick={() => this.goToDeal(item.txid)}>{item.txid}</p>
                          <div className="dealAddress">
                            <ul>
                              {
                                item.preaddress.map((v, i) => {
                                  return v.value == 0 ? <p key={i}><span>{v.address}</span></p> :
                                    <li key={i}><label onClick={() => this.goToAddress(v.address)} className="addBlue">{v.address}</label><span>{v.value} BTC</span></li>
                                })
                              }
                            </ul>
                            <span></span>
                            <ul>
                              {
                                item.nextaddress.map((v, i) => {
                                  return <li key={i}>{v.value == 0 ? <label>地址解析失败</label> : <label className="addBlue" onClick={() => this.goToAddress(v.address)}>{v.address}</label>}<span>{v.value} BTC</span></li>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockHeight1);
