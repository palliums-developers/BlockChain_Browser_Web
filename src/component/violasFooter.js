// 底部
import React, { Component } from 'react';
class ViolasFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <footer>
        <div className="foot">
          <div className="footDescr">
            <div className="developer">
              <h3>开发者</h3>
              <p>API</p>
            </div>
            <div className="contact">
              <h3>联系我们</h3>
              <div className="way">
                <div>
                  <p>邮箱：www@gmail.com</p>
                  <p>电话：010-7843219323</p>
                </div>
                <div>
                  <p><img src="/img/形状 4@2x.png" /></p>
                  <p><img src="/img/形状 5@2x.png" /></p>
                  <p><img src="/img/编组 3@2x.png" /></p>
                  <p><img src="/img/形状 6@2x.png" /></p>
                </div>
              </div>
            </div>
          </div>
          <div className="footLogo">
            <img src="/img/编组 15@2x.png" />
            <img src="/img/编组 152@2x.png" />
          </div>
        </div>
      </footer>
    );
  }
}

export default ViolasFooter;
