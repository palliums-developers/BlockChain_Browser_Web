import React, { Component } from "react";
import BTCTestHeader from "../../component/BTCTestHeader";
import { connect } from "react-redux";
import * as AllActions from "../../store/action/list_action";
import { bindActionCreators } from "redux";
import { timeStamp2String } from "../../utils/timer";
import search_box from "../../utils/search_BTC";
import "./BTCTest_Style.scss";
class BlockHeight extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: 5,
      offset: 0,
      type: "hash",
    };
  }

  async componentDidMount() {
    // let { limit, offset } = this.state
    // await this.hashOrHeight(this.props.match.params.block_hash)

    this.props.getBTCTestBlock(this.props.match.params.block_hash);
    // this.props.getBTCTestBlock('testnet', this.state.type, this.props.match.params.block_hash, this.state.limit, this.state.offset)

    // this.setState({limit:limit+5});
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
      this.setState({ type: "height" });
    } else {
      this.setState({ type: "hash" });
    }
  };
  goToAddress = (address) => {
    this.props.history.push("/app/tBTC_address/" + address);
  };

  goToDeal = (txid) => {
    this.props.history.push({
      pathname: "/app/tBTC_transaction/" + txid,
    });
  };

  // curBlock = (type) => {
  //   let height = this.props.BTC_Test_block * 1;
  //   if (type == 'prev') {
  //     if (height == 1) {
  //       height = 1
  //       this.props.history.push('/app/tBTC_block/' + height)
  //     } else if (height > 0) {
  //       this.props.history.push('/app/tBTC_block/' + height - 1)
  //     }
  //     this.forceUpdate()
  //   } else if (type == 'next') {
  //     if (height <= this.props.netTableList.length) {
  //       this.props.history.push('/app/tBTC_block/' + height + 1)
  //     } else {
  //       return;
  //     }
  //     this.forceUpdate()
  //   }
  // }
  curBlock = (_type) => {
    if (this.props.BTC_Test_block) {
      // let _height = this.props.BTC_Test_block.detail.height
      switch (_type) {
        case "prev":
          this.props.history.push(
            "/app/tBTC_block/" + this.props.BTC_Test_block.previousBlockHash
          );
          break;
        case "next":
          this.props.history.push(
            "/app/tBTC_block/" + this.props.BTC_Test_block.nextBlockHash
          );
          break;
        default:
          break;
      }
    }
  };
  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value,
    });
  };
  onKeyup = (e) => {
    if (e.keyCode === 13) {
      this.getSearch();
    }
  };
  getSearch = () => {
    search_box("testnet", this.state.iptValue, this.props);
  };

  getCurMore = () => {
    this.setState(
      {
        limit: this.state.limit + this.state.limit,
      },
      () => {
        this.props.getBTCTestBlock(
          "testnet",
          this.state.type,
          this.props.match.params.block_hash,
          this.state.limit,
          this.state.offset
        );

        // this.props.getCurDetailBlock({
        //   net: 'mainnet',
        //   type: 'height',
        //   value: this.props.match.params.block * 1,
        //   limit: this.state.limit + 2,
        //   offset: this.state.offset
        // })
      }
    );
  };

  render() {
    let { BTC_Test_block } = this.props;
    return (
      <div className="BTCTestNetContent">
        <BTCTestHeader back="netTo"></BTCTestHeader>
        <div className="contents contents1">
          <div className="blockHeight">
            <div className="form">
              <input
                onChange={(e) => this.getCurValue(e)}
                onKeyDown={(e) => this.onKeyup(e)}
                placeholder="address、txid、block"
              />
              <span onClick={this.getSearch}></span>
            </div>
            {BTC_Test_block ? (
              <div>
                <div className="price">
                  <p>
                    <i>
                      <img src="/img/编组 66@2x.png" />
                    </i>
                    <label>BTC TestNet Block</label>
                    <span>{this.props.match.params.block}</span>
                  </p>
                  <p>
                    <label>BlockHash</label>
                    <span>{BTC_Test_block && BTC_Test_block.hash}</span>
                  </p>
                </div>
                <div className="btn">
                  <button onClick={() => this.curBlock("prev")}>
                    <img src="/img/编组 7.png" />
                    previous
                  </button>
                  <button onClick={() => this.curBlock("next")}>
                    <img src="/img/编组 2.png" />
                    next
                  </button>
                </div>
                <div className="blockHeightContent">
                  <div className="blockHeightAbstract">
                    <h2>Detail</h2>
                    <div className="abstract">
                      <div className="abstractContent">
                        <p>
                          <label>Height</label>
                          <span>{BTC_Test_block && BTC_Test_block.height}</span>
                        </p>
                        <p>
                          <label>timestamp</label>
                          <span>
                            {timeStamp2String(
                              BTC_Test_block && BTC_Test_block.time + "000"
                            )}
                          </span>
                        </p>
                        <p>
                          <label>size</label>
                          <span>
                            {BTC_Test_block && BTC_Test_block.size} Bytes
                          </span>
                        </p>
                        {/* <p><label>Weight</label><span>{BTC_Test_block.detail && BTC_Test_block.detail.weight}</span></p> */}
                        <p>
                          <label>confirmations</label>
                          <span>
                            {BTC_Test_block && BTC_Test_block.confirmations}
                          </span>
                        </p>
                      </div>
                      <div className="line"></div>
                      <div className="abstractContent">
                        <p>
                          <label>nTx</label>
                          <span>
                            {BTC_Test_block && BTC_Test_block.txCount}
                          </span>
                        </p>
                        <p>
                          <label>version</label>
                          <span>
                            {BTC_Test_block && BTC_Test_block.version}
                          </span>
                        </p>
                        <p>
                          <label>difficulty</label>
                          <span>
                            {BTC_Test_block && BTC_Test_block.difficulty}
                          </span>
                        </p>
                        <p>
                          <label>Bits</label>
                          <span>{BTC_Test_block && BTC_Test_block.bits}</span>
                        </p>
                        <p>
                          <label>Nonce</label>
                          <span>{BTC_Test_block && BTC_Test_block.nonce}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="blockHeightDeal">
                    <h2>Transaction</h2>
                    <div className="deal">
                      {BTC_Test_block.txs &&
                        BTC_Test_block.txs.map((item, index) => {
                          return (
                            <div key={index}>
                              <div className="dealContent1 dealContent2">
                                <div className="dealContents">
                                  <p onClick={() => this.goToDeal(item.txid)}>
                                    {item.txid}
                                  </p>
                                  <div className="dealAddress">
                                    <ul>
                                      {item.vin.map((v, i) => {
                                        return v.value == 0 ? (
                                          <p key={i}>
                                            <span>{v.addresses}</span>
                                          </p>
                                        ) : (
                                          <label key={i}>
                                            <label
                                              onClick={() =>
                                                this.goToAddress(v.addresses)
                                              }
                                              className="addBlue"
                                            >
                                              {v.addresses}
                                            </label>
                                            <p>{v.value} BTC</p>
                                          </label>
                                        );
                                      })}
                                    </ul>
                                    <span></span>
                                    <ul>
                                      {item.vout.map((v, i) => {
                                        return (
                                          <li key={i}>
                                            {v.value == 0 ? (
                                              <label>Unparsed address</label>
                                            ) : (
                                              <label
                                                className="addBlue"
                                                onClick={() =>
                                                  this.goToAddress(
                                                    v.scriptPubKey.addresses
                                                  )
                                                }
                                              >
                                                {v.scriptPubKey.addresses}
                                              </label>
                                            )}
                                            <p>{v.value}BTC</p>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </div>
                                  <div className="descrPrice">
                                    <span>
                                      <i></i>
                                      {item.output} BTC
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="line"></div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
                <div className="btns">
                  <button onClick={this.getCurMore}>more</button>
                </div>
              </div>
            ) : (
              <div className="unavailable">
                <img src="/img/编组 12@2x(1).png"></img>
                <p>
                  Block {this.props.match.params.block_hash} is not available on
                  BTC TestNet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state.ListReducer;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AllActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BlockHeight);
