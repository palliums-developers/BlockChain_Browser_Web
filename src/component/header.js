// 头部
import React,{ Component } from 'react';
import {NavLink,withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import * as AllActions from '../store/action/list_action'
import { bindActionCreators } from 'redux'
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = { 
     }
  }

  render() { 
    let {priceList} = this.props
    return (
      <header className={this.props.back == 'net' ? "netBack":"netToBack"}>
        <div className="head">
          <div className="logo">
            <img src="/img/编组 15@2x.png"/>
          </div>
          <div className="price">
             {/* <div>
               <img src="/img/形状 2@2x.png"/>
             </div> */}
             {/* {
               priceList && <div className="priceContent">
                <p>
                  <span>BTC</span>
                  <span className={priceList.daily > 0 ? 'greenC' : 'redC'}>{priceList.daily}%</span>
                </p>
                <p>${priceList.last}</p>
             </div>
             } */}
             
          </div>
          <div className="navList">
            <div className="navChange">
              <NavLink to='/app/mainNet'>Test network</NavLink>
            </div> 
          </div>
        </div>
      </header>
    );
  }
}
const mapStateToProps = state => {
  return state.ListReducer
}

const mapDiapatchToProps = diapatch => bindActionCreators(AllActions, diapatch) 

export default connect(mapStateToProps,mapDiapatchToProps)(withRouter(Header));
