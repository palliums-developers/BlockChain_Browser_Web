import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import BTCMainHeader from '../../component/BTCMainHeader'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_BTC'
import './BTCMain_Style.scss';

class BTCMainNet extends Component {
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
    this.props.getBTCMainList();
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
    // console.log(this.props)
    return (
      <div className='BTCMainNetContent'>
        <BTCMainHeader back="net"></BTCMainHeader>
        <div className="contents">
          <div className="mainNet">
            <div className="searchBox">
              <h3>BTC MainNet</h3>
              <div className="form">
                <input onChange={(e) => this.getCurValue(e)} placeholder="address、txid" />
                <span onClick={this.getSearch}></span>
              </div>
            </div>
            <div className='mainContent'>
              <div className="mainHead">
                <i><img src="/img/编组 17@2x.png" /></i><span>LATEST BLOCK</span>
              </div>
              <div className="table">
                <table bgcolor="rgba(247, 248, 251, 1)">
                  <thead>
                    <tr>
                      <th colSpan="3">Height</th>
                      <th colSpan="4">Size</th>
                      <th colSpan="4">Profit</th>
                      <th colSpan="6">timeStamp</th>
                      <th colSpan="6">Hash</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.BTC_main_List && this.props.BTC_main_List.map((item, index) => {
                        return <tr key={index}>
                          <td colSpan="3" onClick={() => {
                            // console.log(item.height);
                            this.props.history.push('/app/BTC_block/'+ item.height);
                          }}>{item.height}</td>
                          <td colSpan="4">{item.size}</td>
                          <td colSpan="4">{item.profit}</td>
                          <td colSpan="6">
                            {timeStamp2String(item.timestamp + '000')}
                          </td>
                          <td colSpan="6" onClick={() => {
                            this.props.history.push('/app/BTC_block/' + item.hash)
                          }}>{(item.hash).slice(0, 30) + '...'}
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="tableList">
                {
                  this.props.BTC_main_List && this.props.BTC_main_List.map((v, i) => {
                    return <div className="listContent" key={i}>
                      <p><label>Height</label><span onClick={() => {
                        this.props.history.push('/app/BTC_block/' + v.height);
                      }}>{v.height}</span></p>
                      <p><label>Size</label><span>{v.size}</span></p>
                      <p><label>Profit</label><span>{v.profit}</span></p>
                      <p><label>timeStamp</label><span>{timeStamp2String(v.timestamp + '000')}</span></p>
                      <p><label>Hash</label><span onClick={() => {
                        this.props.history.push('/app/BTC_block/' + v.hash)
                      }}>{(v.hash).slice(0, 30) + '...'}</span></p>
                      
                    </div>
                  })
                }
              </div>
            </div>
            <p id="more" onClick={this.loadMore}>load more</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(BTCMainNet);
