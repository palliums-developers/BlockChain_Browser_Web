import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import LibraHeader from '../../component/libraHeader'
import { timeStamp2String } from '../../utils/timer'
import search_box from '../../utils/search_libra'
import './libraStyle.scss';
class Libra_testnet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeBack: 'light',
      list: [],
      limit: 10,
      offset: 0,
      iptValue: ''
    }
  }
  componentDidMount() {
    // this.props.getCurListBlock();
    this.props.getCurTestListBlock(this.state.limit, this.state.offset);
    this.setState({ limit: this.state.limit + 10 })
  }

  getCurValue = (e) => {
    this.setState({
      iptValue: e.target.value
    })
  }

  returnStatus = (_num) => {
    if (_num == 4001) {
      return "success"
    } else {
      return "failed"
    }
  }
  loadMore = () => {
    this.setState({ limit: this.state.limit + 10 });
    this.props.getCurTestListBlock(this.state.limit, this.state.offset);
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
    return (
      <div className='libraContent'>
        <LibraHeader back="net"></LibraHeader>
        <div className="contents">
          <div className="mainNet">
            <div className="searchBox">
              <h3>Libra TestNet</h3>
              <div className="form">
                <input onChange={(e) => this.getCurValue(e)} onKeyDown={(e) => this.onKeyup(e)} placeholder="address、version" />
                <span onClick={this.getSearch}></span>
              </div>
            </div>
            <div className='mainContent'>
              <div className="mainHead">
                <i><img src="/img/编组 17@2x.png" /></i><span>Last Version</span>
              </div>
              <div className="table">
                <table bgcolor="rgba(247, 248, 251, 1)">
                  <thead>
                    <tr>
                      <th colSpan="2">Version</th>
                      <th colSpan="3">Time</th>
                      <th colSpan="2">Type</th>
                      <th colSpan="4">From</th>
                      <th colSpan="2">Status</th>
                      <th colSpan="4">To</th>
                      <th colSpan="4">Amount</th>
                      <th colSpan="2">Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.props.libra_testnet && this.props.libra_testnet.map((item, index) => {
                        return <tr key={index}>
                          <td colSpan="2" onClick={() => {
                            this.props.history.push('/app/Libra_dealbox/' + item.version)
                          }}>{item.version}</td>
                          <td colSpan="3">
                            {timeStamp2String(item.expiration_time + '000')}
                          </td>
                          <td colSpan="2">{(item.type)}</td>
                          <td colSpan="4" onClick={() => {
                            this.props.history.push('/app/Libra_addressBox/' + item.sender)
                          }}>{item.sender ? (item.sender).slice(0, 20) + '...' : 'Null'}</td>
                          <td colSpan="2">{this.returnStatus(item.status)}</td>
                          <td colSpan="4" onClick={() => {
                            if (item.receiver) {
                              this.props.history.push('/app/Libra_addressBox/' + item.receiver)
                            }
                          }}>{item.receiver ? (item.receiver).slice(0, 20) + '...' : 'Null'}</td>
                          <td colSpan="4">{item.amount /1e6}</td>
                          <td colSpan="2">{item.gas}</td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
              <div className="tableList">
                {
                  this.props.libra_testnet && this.props.libra_testnet.map((v, i) => {
                    return <div className="listContent" key={i}>
                      <p><label>Version</label><span onClick={() => {
                        this.props.history.push('/app/Libra_dealbox/' + v.version)
                      }}>{v.version}</span></p>
                      <p><label>Time</label><span>{timeStamp2String(v.expiration_time + '000')}</span></p>
                      <p><label>Type</label><span>{(v.type)}</span></p>
                      <p><label>From</label><span onClick={() => {
                        this.props.history.push('/app/Libra_addressBox/' + v.sender)
                      }}>{v.sender ? (v.sender).slice(0, 20) + '...' : 'Null'}</span></p>
                      <p><label>Status</label><span>{this.returnStatus(v.status)}</span></p>
                      <p><label>To</label><span onClick={() => {
                        this.props.history.push('/app/Libra_addressBox/' + v.receiver)
                      }}>{v.receiver ? (v.receiver).slice(0, 20) + '...' : 'Null'}</span></p>
                      <p><label>Amount</label><span>{v.amount /1e6}</span></p>
                      <p><label>Fee</label><span>{v.gas}</span></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Libra_testnet);
