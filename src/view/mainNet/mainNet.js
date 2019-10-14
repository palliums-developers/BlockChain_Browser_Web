import React,{ Component } from 'react';
import { connect } from 'react-redux'
import * as AllActions from '../../store/action/list_action'
import { bindActionCreators } from 'redux'
import Header from '../../component/header'
import {timeStamp2String} from '../../utils/timer'
import search_box from '../../utils/iptVal'
class MainNet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changeBack:'light' ,
      list:[],
      limit:20,
      offset:0,
      iptValue:''
    }
  }
  componentDidMount(){
    this.props.getCurListBlock()
  }

  getCurValue = (e) =>{
    this.setState({
      iptValue:e.target.value
    })
  }

  getSearch = () =>{
    search_box('mainnet',this.state.iptValue,this.props)
  }

  render() { 
    // console.log(this.props.netTableList)
    return ( 
      <div className='content'>
       <Header back="net"></Header>
        <div className="contents">
          <div className="mainNet">
          <div className="searchBox">
            <h3>Libra Blockchain Browser&TestNet</h3>
            <div className="form">
              <input onChange={(e)=>this.getCurValue(e)} placeholder="address、txid"/>
              <span onClick={this.getSearch}></span>
            </div>
          </div>
          <div className='mainContent'>
            <div className="mainHead">
                <i><img src="/img/编组 17@2x.png"/></i><span>LATEST BLOCK</span>
            </div>
            <div className="table">
              <table bgcolor="rgba(247, 248, 251, 1)">
                <thead>
                  <tr>
                    <th colSpan="3">ID</th>
                    <th colSpan="7">From</th>
                    <th colSpan="7">To</th>
                    <th colSpan="4">Value</th>
                    <th colSpan="6">Time</th>
                  </tr>
                </thead>
                <tbody>
                
                {
                  this.props.netTableList && this.props.netTableList.map((item,index)=>{
                    return <tr key={index}>
                    <td colSpan="3" onClick={()=>{
                      this.props.history.push('/app/dealbox/'+item.version)
                    }}>{item.version}</td>
                    <td colSpan="7" onClick={()=>{
                      this.props.history.push('/app/addressBox/'+item.from)
                    }}>{(item.from).slice(0,24)+'...'}</td>
                    <td colSpan="7" onClick={()=>{
                      this.props.history.push('/app/addressBox/'+item.to)
                    }}>{(item.to).slice(0,24)+'...'}</td>
                    <td colSpan="4">{item.maxGasAmount}</td>
                    <td colSpan="6">
                     {timeStamp2String(item.expirationTime+'000')}
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

const mapDispatchToProps = dispatch => bindActionCreators(AllActions, dispatch) 

export default connect(mapStateToProps,mapDispatchToProps)(MainNet);
