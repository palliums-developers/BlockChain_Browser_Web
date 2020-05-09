import React, { Component } from 'react';
import BTCMainHeader from '../../component/BTCMainHeader'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_BTC'
import './BTCMain_Style.scss';
class BlockHeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      offset: 0,
      pagesize: 5,
      type: 'hash'
    }
  }

  async componentDidMount() {
    // let { limit, offset } = this.state;
    await this.hashOrHeight(this.props.match.params.block_hash)
    // this.props.getCurListBlock()
    // this.props.getCurDetailBlock({
    //   net: 'mainnet',
    //   type: 'height',
    //   value: this.props.match.params.block * 1,
    //   limit: limit,
    //   offset: offset
    // })
    // console.log(this.props.match.params.block_hash)
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    this.props.getBTCMainBlock('mainnet', this.state.type, this.props.match.params.block_hash, this.state.limit, this.state.offset)
    this.props.getBTCMainBlockTx(this.props.match.params.block_hash, this.state.pagesize)
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
    this.props.history.push('/app/BTC_address/' + address)
  }

  goToDeal = (txid) => {
    this.props.history.push({
      pathname: '/app/BTC_transaction/' + txid
    })
  }

  // curBlock = (type) => {
  //   let prev = this.props.match.params.block - 1;
  //   if (type == 'prev') {
  //     if (prev == 1) {
  //       prev = 1
  //       this.props.history.push('/app/blockHeight/' + prev)
  //     } else if (prev > 0) {
  //       this.props.history.push('/app/blockHeight/' + prev)
  //     }
  //     this.forceUpdate()
  //   } else if (type == 'next') {
  //     prev = (this.props.match.params.block) * 1 + 1;
  //     if (prev <= this.props.netTableList.length) {
  //       this.props.history.push('/app/blockHeight/' + prev)
  //     } else {
  //       return;
  //     }
  //     this.forceUpdate()
  //   }
  // }
  curBlock = (_type) => {
    if (this.props.BTC_main_block) {
      let _height = this.props.BTC_main_block.height
      switch (_type) {
        case 'prev':
          this.props.history.push('/app/BTC_block/' + (_height - 1))
          break;
        case 'next':
          this.props.history.push('/app/BTC_block/' + (_height + 1))
          break;
        default:
          break;
      }
    }
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
  getCurMore = () => {
    this.setState({
      limit: this.state.limit + this.state.limit,
      offset: this.state.offset,
      pagesize: this.state.pagesize + this.state.pagesize
    }, () => {
      // this.props.getCurDetailBlock({
      //   net: 'mainnet',
      //   type: 'height',
      //   value: this.props.match.params.block * 1,
      //   limit: this.state.limit + 2,
      //   offset: this.state.offset
      // })
      // this.props.getBTCMainBlock('mainnet', this.state.type, this.props.match.params.block_hash, this.state.limit, this.state.offset)
      this.props.getBTCMainBlockTx(this.props.match.params.block_hash, this.state.pagesize)
    })
  }

  render() {
    // console.log(this.props.match.params.block_hash)
    // console.log(this.props)
    let { BTC_main_block, BTC_main_block_tx } = this.props;
    // console.log(BTC_main_block);

    return (
      <div className="BTCMainNetContent">
        <BTCMainHeader back="netTo"></BTCMainHeader>
        <div className="contents contents1">
          <div className="blockHeight">
            <div className="form">
              <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、txid、block" />
              <span onClick={this.getSearch}></span>
            </div>
            {BTC_main_block ? <div>
              <div className="price">
                <p>
                  <i><img src="/img/编组 66@2x.png" /></i>
                  <label>BTC MainNet Block</label>
                  <span>{this.props.match.params.block}</span>
                </p>
                <p><label>BlockHash</label><span>{BTC_main_block.hash}</span></p>
              </div>
              <div className="btn">
                <button onClick={() => this.curBlock('prev')}><img src="/img/编组 7.png" />Previous</button>
                <button onClick={() => this.curBlock('next')}><img src="/img/编组 2.png" />Next</button>
              </div>
              <div className="blockHeightContent">
                <div className="blockHeightAbstract">
                  <h2>Detail</h2>
                  <div className="abstract">
                    <div className="abstractContent">
                      <p><label>Height</label><span>{BTC_main_block.height}</span></p>
                      <p><label>timestamp</label><span>{timeStamp2String(BTC_main_block.timestamp + '000')}</span></p>
                      <p><label>size</label><span>{BTC_main_block.size} Bytes</span></p>
                      <p><label>Weight</label><span>{BTC_main_block.weight}</span></p>
                      <p><label>confirmations</label><span>{BTC_main_block.confirmations}</span></p>
                    </div>
                    <div className="line"></div>
                    <div className="abstractContent">
                      <p><label>nTx</label><span>{BTC_main_block.tx_count}</span></p>
                      <p><label>version</label><span>{BTC_main_block.version}</span></p>
                      <p><label>difficulty</label><span>{BTC_main_block.difficulty}</span></p>
                      <p><label>Bits</label><span>{BTC_main_block.bits}</span></p>
                      <p><label>Nonce</label><span>{BTC_main_block.nonce}</span></p>
                    </div>
                  </div>
                </div>
                <div className="blockHeightDeal">
                  <h2>Transaction</h2>
                  <div className="deal">
                    {
                      BTC_main_block_tx && BTC_main_block_tx.map((item, index) => {
                        return <div key={index}><div className="dealContent1 dealContent2">
                          <div className="dealContents">
                            <p onClick={() => this.goToDeal(item.hash)}>{item.hash}</p>
                            <div className="dealAddress">
                              <ul>
                                {
                                  item.inputs.map((v, i) => {
                                    return v.prev_value == 0 ? <p key={i}><span>{v.prev_addresses}</span></p> :
                                      <li key={i}><label onClick={() => this.goToAddress(v.prev_addresses)} className="addBlue">{v.prev_addresses}</label><span>{v.prev_value / 1e8} BTC</span></li>
                                  })
                                }
                              </ul>
                              <span></span>
                              <ul>
                                {
                                  item.outputs.map((v, i) => {
                                    return <li key={i}>{v.value == 0 ? <label>Unparsed address</label> : <label className="addBlue" onClick={() => this.goToAddress(v.addresses)}>{v.addresses}</label>}<span>{v.value / 1e8} BTC</span></li>
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
                <button onClick={this.getCurMore}>More</button>
              </div>
            </div> : <div className="unavailable"><img src='/img/编组 12@2x(1).png'></img><p>Block {this.props.match.params.block_hash} is not available on BTC MainNet</p></div>}
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
