import React,{ Component } from 'react';
import Header from '../../component/header'
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import search_box from '../../utils/iptVal'
let QRCode = require('qrcode-react');

class Address1 extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      limit:2,
      offset:0
     }
  }
  goToAddress = (address) =>{
    this.props.history.push('/app/addressBox1/'+address)
  }
  goToDeal = (txid) =>{
    this.props.history.push({
      pathname:'/app/dealbox1/'+txid
    })
  }
  componentDidMount(){
     this.props.getCurListBlock()
     this.props.getCurDetailAddress({
        net:'testnet',
        address:this.props.match.params.address
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
    let {addressObj,txs} = this.props
    return ( 
        <div className="content">
        <Header back="netTo"></Header>
         <div className="contents contents1">
          <div className="addressBox">
            <div className="form">
              <input onChange={(e)=>this.getCurValue(e)} placeholder="地址、高度或哈希"/>
              <span onClick={this.getSearch}></span>
            </div>
            <div className="price">
              <p>
                <i><img src="/img/address@2x.png"/></i>
                <label>地址</label>
              </p>
              <p>{this.props.match.params.address}</p>
              <p>
                <QRCode id="qrCode" value={addressObj.address} size={54}/>
              </p>
            </div>
            <div className="blockHeightContent">
               <div className="blockHeightAbstract">
                  <h2>摘要</h2>
                  <div className="abstract"> 
                   <div className="abstractContent">
                      <p><label>地址</label><span>{addressObj.address}</span></p>
                      <div>
                          <p><label>余额</label><span>{addressObj.balance} BTC</span></p>
                           <p><label>总接收</label><span>{addressObj.received} BTC</span></p>
                      </div>
                      <p><label>交易数量</label><span>{addressObj.amount}</span></p>
                   </div>
                  </div>
               </div>
               <div className="blockHeightDeal">
                    <h2>交易数量 {addressObj.amount}</h2>
                    <div className="deal">
                      {
                        txs && txs.map((item,index)=>{
                          return <div key={index}><div className="dealContent1 dealContent2">
                          <div className="dealContents">
                            <p onClick={()=>this.goToDeal(item.txid)}>{item.txid}</p>
                            <div className="dealAddress">
                              <ul>
                              {
                                item.preaddress.map((v,i)=>{
                                  return v.value == 0 ? <p key={i}><span>{v.address}</span></p> : 
                                  <li key={i}><label onClick={()=>this.goToAddress(v.address)} className="addBlue">{v.address}</label><span>{v.value} BTC</span></li>
                                })
                              }
                              </ul>
                              <span></span>
                              <ul>
                              {
                                item.nextaddress.map((v,i)=>{
                                  return <li key={i}>{v.value == 0 ? <label>地址解析失败</label> : <label className="addBlue" onClick={()=>this.goToAddress(v.address)}>{v.address}</label>}<span>{v.value} BTC</span></li>
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
  
export default connect(mapStateToProps,mapDispatchToProps)(Address1);
