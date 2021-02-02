// 头部
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as AllActions from "../store/action/list_action";
import { bindActionCreators } from "redux";
// import GetTestCoins from "../component/GetTestCoins";
class MobileHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenuViolas: false,
      showMenuBTC: false,
      getCoins: false,
      showRouters: false,
      showMenuId: 0,
      vCoin: [
        // { pathname: '/app/Currency/VTOKEN', type: 'vtoken' }
        { pathname: "/app/Violas", type: "vtoken" },
      ],
      bCoin: [
        { pathname: "/app/BTC", type: "BTC" },
        { pathname: "/app/tBTC", type: "BTC testnet" },
      ],
    };
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.showGetCoins = this.showGetCoins.bind(this);
  }
  componentDidMount() {
    this.showMenu("violas", 0);
  }
  showMenu = (event, id) => {
    // this.setState({ showMenuViolas: true });
    // console.log(event);
    switch (event) {
      case "violas":
        this.setState({ showMenuId: id, showMenuViolas: true }, () => {
          document.addEventListener("click", this.closeMenu);
        });
        break;
      case "BTC":
        this.setState({ showMenuId: id, showMenuBTC: true }, () => {
          document.addEventListener("click", this.closeMenu);
        });
        break;
      default:
        return;
    }
  };
  closeMenu = (_) => {
    this.setState({ showMenuBTC: false, showMenuViolas: false }, () => {
      document.removeEventListener("click", this.closeMenu);
    });
  };
  addCurrencyList() {
    if (this.props.currency.length > 0 && this.state.vCoin.length == 1) {
      let vCoin_temp = this.state.vCoin;
      for (let i in this.props.currency) {
        vCoin_temp.push({
          pathname: "/app/Currency/" + this.props.currency[i].name,
          type: this.props.currency[i].name.toLowerCase(),
        });
      }
    }
  }
  showGetCoins() {
    // this.props.showGetCoins();
    this.setState(
      {
        showRouters: false,
      },
      () => {
        this.props.history.push("/faucet");
      }
    );
  }
  render() {
    this.addCurrencyList();
    let { showMenuId, showRouters } = this.state;
    return (
      <div className="mobileHead">
        <div className={showRouters ? "head1 head1Back" : "head1"}>
          <p
            onClick={() => {
              this.setState({
                showRouters: !this.state.showRouters,
              });
            }}
          >
            <img src="/img/listicon.png" />
          </p>
          <p
            onClick={() => {
              this.setState(
                {
                  showRouters: false,
                },
                () => {
                  this.props.history.push("/app/Violas");
                }
              );
            }}
          >
            <img src="/img/形状结合 2@2x.png" />
          </p>
          {/* <p onClick={this.showGetCoins}>Get test coins</p> */}
        </div>
        {this.state.showRouters ? (
          <div className="mark">
            <div className="headList">
              <div className="leftList">
                <span
                  onClick={() => this.showMenu("violas", 0)}
                  className={showMenuId == 0 ? "active" : null}
                >
                  Violas
                </span>
                <span
                  onClick={() => this.showMenu("BTC", 1)}
                  className={showMenuId == 1 ? "active" : null}
                >
                  BTC
                </span>
                <span
                  onClick={() => {
                    this.setState(
                      {
                        showRouters: false,
                      },
                      () => {
                        this.props.history.push("/app/Diem");
                      }
                    );
                  }}
                >
                  Diem
                </span>
              </div>
              <div className="rightList">
                {this.state.showMenuId == 0
                  ? this.state.vCoin.map((v, i) => {
                      return (
                        <NavLink
                          onClick={() => {
                            this.setState({
                              showRouters: false,
                            });
                          }}
                          to={v.pathname}
                          activeClassName="active"
                          key={i}
                        >
                          {v.type}
                        </NavLink>
                      );
                    })
                  : null}
                {this.state.showMenuId == 1
                  ? this.state.bCoin.map((v, i) => {
                      return (
                        <NavLink
                          onClick={() => {
                            this.setState({
                              showRouters: false,
                            });
                          }}
                          to={v.pathname}
                          activeClassName="active"
                          key={i}
                        >
                          {v.type}
                        </NavLink>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return state.ListReducer;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AllActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MobileHeader));
