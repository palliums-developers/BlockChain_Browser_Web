import React,{ Component } from 'react';
import Header from '../../component/header'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import {timeStamp2String} from '../../utils/timer'
import search_box from '../../utils/iptVal'

class TestNet extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
    this.props.getCurTestListBlock()
  }

  getSearch = () =>{
    search_box('testnet',this.state.iptValue,this.props)
  }

  render() { 
    return ( 
      <div className="content">
        <Header back="textNet"></Header>
        <div className="contents">
          <div className="mainNet">
          <div className="searchBox">
            <h3>区块浏览器&测试网</h3>
            <div className="form">
              <input placeholder="地址、高度或哈希"/>
              <span onClick={this.getSearch}></span>
            </div>
          </div>
          <div className='mainContent'>
            <div className="mainHead">
                <i><img src="/img/编组 17@2x.png"/></i><span>最近出块</span><label>LATEST BLOCK</label>
            </div>
            <div className="table">
              <table bgcolor="rgba(247, 248, 251, 1)">
                <tbody>
                <tr>
                  <th colSpan="3">块高度</th>
                  <th colSpan="3">大小(B)</th>
                  <th colSpan="5">块收益(BTC)</th>
                  <th colSpan="5" className='disNone'>时间戳</th>
                  <th colSpan="8">块哈希</th>
                </tr>
                {
                  this.props.testTableList && this.props.testTableList.map((item,index)=>{
                    return <tr key={index}>
                    <td colSpan="3" onClick={()=>{
                      this.props.history.push('/app/blockHeight1/'+item.height)
                    }}>{item.height}</td>
                    <td colSpan="3">{item.size}</td>
                    <td colSpan="5">{item.profit}</td>
                    <td colSpan="5" className='disNone'>{timeStamp2String(item.timestamp+'000')}</td>
                    <td colSpan="8" className="address" onClick={()=>{
                      this.props.history.push('/app/pieceHash1/'+item.hash)
                    }}>
                      <span>{item.hash}</span>
                      <span>{
                       (item.hash).replace((item.hash).slice(25,40),'...')
                      }</span>
                    </td>
                  </tr>
                  })
                }
                </tbody>
              </table>
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

const mapDiapatchToProps = dispatch => bindActionCreators(AllActions, dispatch) 

export default connect(mapStateToProps,mapDiapatchToProps)(TestNet);
