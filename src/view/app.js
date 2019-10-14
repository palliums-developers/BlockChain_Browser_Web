import React,{ Component } from 'react';
import Footer from '../component/footer'
import RouterView from '../router/routerView'
import './app.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 

     } 
  }
  componentDidMount(){
    let frame = window.localStorage.getItem('frame')
    if(!frame){
      window.localStorage.setItem('frame','light')
    }
  }
  getFrame = () =>{
    let frame = window.localStorage.getItem('frame')
    if(frame== 'light'){
      window.localStorage.setItem('frame','dark')
      this.forceUpdate()
    }else if(frame == 'dark'){
      window.localStorage.setItem('frame','light')
      this.forceUpdate()
    } 
    
  }
  render() { 
    let {routes} = this.props
    
    return ( 
      <div id="wrap" className={window.localStorage.getItem('frame') == 'light'?'':'wrapBox'}>
        <div className="back" onClick={this.getFrame}>
              {
                window.localStorage.getItem('frame') == 'light' ? <img src="/img/编组 16@2x.png"/> : <img src="/img/编组 13@2x.png"/>
              }
              
        </div>
        <RouterView routes={routes}></RouterView>
        <Footer></Footer>
        {
          window.localStorage.getItem('frame') == 'light' ? <div className="box1"><img src="/img/编组 4复制 3.png"/></div > : <div className="box1"><img src="/img/编组 4复制1.png"/></div >
        }
        {
          window.localStorage.getItem('frame') == 'light' ?  <div className="box2"><img src="/img/编组 4.png"/></div > :  <div className="box2"><img src="/img/编组 42.png"/></div >
        }
        {
          window.localStorage.getItem('frame') == 'light' ?  <div className="box3"><img src="/img/编组 5.png"/></div > :  <div className="box3"><img src="/img/编组 52.png"/></div >
        }
      </div>
    );
  }
}


export default App;
