import React,{ Component } from 'react';
import Header from '../../component/header'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import {timeStamp2String} from '../../utils/timer'
import search_box from '../../utils/iptVal'

class Deal extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }

  componentDidMount(){
     this.props.getCurListBlock()
     this.props.getCurSearchtx({
        net:'testnet',
        txid:this.props.match.params.txid
     })
  }
  goToAddress = (address) =>{
    this.props.history.push({
      pathname:'/app/addressBox1',
      state:{
        address:address
      }
    })
  }
  goToDeal = (txid) =>{
    this.props.history.push({
      pathname:'/app/dealbox1/'+txid
    })
  }

  getCurValue = (e) =>{
    this.setState({
      iptValue:e.target.value
    })
  }

  getSearch = () =>{
    search_box('testnet',this.state.iptValue,this.props)
  }

  render() { 
    let { dealList,iptLength,outLength } = this.props
    return ( 
        <div className="content">
        <Header back="netTo"></Header>
         <div className="contents contents1">
          <div className="dealBox">
            <div className="form">
              <input onChange={(e)=>this.getCurValue(e)} placeholder="地址、txid、高度或哈希"/>
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/编组 30@2x.png"/></i>
                <label>交易</label>
              </p>
              <p>{this.props.match.params.txid}</p>
              <p><label>块哈希</label><p>{dealList.blockhash}</p></p>
            </div>
            <div className="blockHeightContent">
               <div className="blockHeightAbstract">
                  <h2>摘要</h2>
                  <div className="abstract">
                   <div className="abstractContent">
                      <p><label>块高度</label><span>{dealList.blockheight}</span></p>
                      <p><label>时间戳</label><span>{timeStamp2String(dealList.timestamp+'000')}</span></p>
                      <p><label>大小</label><span>{dealList.size} Bytes</span></p>
                      <p><label>Weight</label><span>{dealList.weight}</span></p>
                      <p><label>确认数</label><span>{dealList.confirmations}</span></p>
                   </div>
                   <div className="line"></div>
                   <div className="abstractContent">
                      <p><label>输入</label><span>{dealList.input} BTC</span></p>
                      <p><label>输出</label><span>{dealList.output} BTC</span></p>
                   </div>
                  </div>
               </div>
               <div className="blockHeightDeal">
                    <div className="listDEscr">
                       <span>输入{iptLength}</span>
                       <span>{dealList.input} BTC</span>
                       <span>输出{outLength}</span>
                       <span>{dealList.output} BTC</span>
                    </div>
                    <div className="deal">
                       <div className="dealContent1">
                         <div className="dealContents">
                           <p onClick={()=>this.goToDeal(dealList.txid)}>{dealList.txid}</p>
                           <div className="dealAddress">
                              <ul>
                              {
                                  dealList.preaddress && dealList.preaddress.map((v,i)=>{
                                    return v.value == 0 ? <p key={i}><span>{v.address}</span></p> : 
                                    <li key={i}>
                                      {
                                        v.value == 0 ? <label>地址解析失败</label> : v.address.length == 34 ? <label className="addBlue" onClick={()=>this.goToAddress(v.address)}>{v.address}</label> : <label>{v.address}</label>
                                      }
                                      <span>{v.value} BTC</span></li>
                                  })
                                }
                                </ul>
                                <span></span>
                                <ul>
                                {
                                  dealList.nextaddress && dealList.nextaddress.map((v,i)=>{
                                    return <li key={i}>
                                    {v.value == 0 ? <label>地址解析失败</label> : v.address.length == 34 ? <label className="addBlue" onClick={()=>this.goToAddress(v.address)}>{v.address}</label> : <label>{v.address}</label>
                                    }
                                    <span>{v.value} BTC</span>
                                  </li>
                                
                                  })
                                }
                               </ul>
                           </div>
                           <div className="descrPrice">
                              <span>确认数 {dealList.confirmations}</span>
                         </div>
                         </div>
                       </div>
                    </div>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Deal);
