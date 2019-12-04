import React, { Component } from 'react';
import BTCTestHeader from '../../component/BTCTestHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/iptVal'
import './BTCTest_Style.scss';
class BlockHeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 2,
      offset: 0,
      type: 'hash'
    }
  }

  async componentDidMount() {
    // let { limit, offset } = this.state
    await this.hashOrHeight(this.props.match.params.block_hash)
    this.props.getBTCTestBlock('mainnet', this.state.type, this.props.match.params.block_hash, this.state.limit, this.state.offset)

    
    // this.props.getCurListBlock()

    // this.props.getCurDetailBlock({
    //   net: 'mainnet',
    //   type: 'height',
    //   value: this.props.match.params.block * 1,
    //   limit: limit,
    //   offset: offset
    // })
  }
  hashOrHeight = async (_value) => {
    let re = /^[0-9]+.?[0-9]*$/;
    if (re.test(_value)) {
      this.setState({ type: 'height' })
    } else {
      this.setState({ type: 'hash' })
    }
  }
  goToAddress = (address) => {
    this.props.history.push('/app/addressBox/' + address)
  }

  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/dealbox/' + txid
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
      if (prev <= this.props.netTableList.length) {
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
    search_box('mainnet', this.state.iptValue, this.props)
  }

  getCurMore = () => {
    this.setState({
      limit: this.state.limit,
      offset: this.state.offset + this.state.limit
    }, () => {
      this.props.getCurDetailBlock({
        net: 'mainnet',
        type: 'height',
        value: this.props.match.params.block * 1,
        limit: this.state.limit + 2,
        offset: this.state.offset
      })
    })
  }

  render() {
    let { abstractDetail, dealsList, total,BTC_Test_block } = this.props;
    return (
      <div className="BTCTestNetContent">
        <BTCTestHeader back="netTo"></BTCTestHeader>
        <div className="contents contents1">
          <div className="blockHeight">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} placeholder="地址、txid、高度或哈希" />
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
                <p>
                  <i><img src="/img/编组 66@2x.png" /></i>
                  <label>Block</label>
                  <span>{this.props.match.params.block}</span>
                </p>
                <p><label>BlockHash</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.hash}</span></p>
            </div>
            <div className="btn">
              <button onClick={() => this.curBlock('prev')}><img src="/img/编组 7.png" />previous</button>
              <button onClick={() => this.curBlock('next')}><img src="/img/编组 2.png" />next</button>
            </div>
            <div className="blockHeightContent">
              <div className="blockHeightAbstract">
                <h2>Detail</h2>
                <div className="abstract">
                  <div className="abstractContent">
                    <p><label>Height</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.height}</span></p>
                    <p><label>timestamp</label><span>{timeStamp2String(BTC_Test_block.detail&&BTC_Test_block.detail.timestamp + '000')}</span></p>
                    <p><label>size</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.size} Bytes</span></p>
                    <p><label>Weight</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.weight}</span></p>
                    <p><label>confirmations</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.confirmations}</span></p>
                  </div>
                  <div className="line"></div>
                  <div className="abstractContent">
                    <p><label>nTx</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.nTx}</span></p>
                    <p><label>version</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.version}</span></p>
                    <p><label>difficulty</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.difficulty}</span></p>
                    <p><label>Bits</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.bits}</span></p>
                    <p><label>Nonce</label><span>{BTC_Test_block.detail&&BTC_Test_block.detail.nonce}</span></p>
                  </div>
                </div>
              </div>
              <div className="blockHeightDeal">
                <h2>Transaction</h2>
                <div className="deal">
                {
                    BTC_Test_block.showtx && BTC_Test_block.showtx.map((item, index) => {
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
                                  return <li key={i}>{v.value == 0 ? <label>Unparsed address</label> : <label className="addBlue" onClick={() => this.goToAddress(v.address)}>{v.address}</label>}<span>{v.value} BTC</span></li>
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
              <button onClick={this.getCurMore}>more</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(BlockHeight);
