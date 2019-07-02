import React from 'react';

import { connect } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';
import qs from 'query-string';

import { getSession } from 'app/shared/reducers/authentication';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';
import Footer from 'app/shared/layout/footer/footer';

import { getUserByMobile, reset } from 'app/entities/user-profile/user-profile.reducer';

export interface IBankTransferProp extends StateProps, DispatchProps {
  location: any;
  history: any;
}

export interface IBankTransferState {
  mobile: any;
}

export class BankTransfer extends React.Component<IBankTransferProp> {
  state: IBankTransferState = {
    mobile: null
  };

  componentDidMount() {
    if (this.props.location) {
      const parsed = qs.parse(this.props.location.search);
      if (parsed.mobile) {
        // this.props.getShippingCart(decodeId(parsed.shopid));
      }
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  onChangeMobile = e => {
    this.setState({
      mobile: e.target.value
    });
  };

  searchClick = () => {
    this.props.getUserByMobile('mobile.contains=' + this.state.mobile);
  };

  topupClick = () => {};

  render() {
    console.log(this.props.userProfileList);
    return (
      <>
        <Sidebar isAuthenticated={this.props.isAuthenticated} activeMenu="payment" activeSubMenu="" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <div className="row  border-bottom white-bg dashboard-header">
            <div className="input-group">
              <input
                type="text"
                placeholder="Số điện thoại"
                name="mobile"
                className="form-control form-control-lg"
                onChange={this.onChangeMobile}
              />
              <div className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.searchClick}>
                  <i className="fa fa-search" /> Tìm kiếm
                </button>
              </div>
            </div>
          </div>
          <div className="row wrapper wrapper-content">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox">
                  <div className="ibox-content">
                    {this.props.userProfileList.length === 0 ? (
                      <div className="no-content">Không có dữ liệu</div>
                    ) : (
                      <table
                        className="footable table table-stripped toggle-arrow-tiny tablet breakpoint footable-loaded"
                        data-page-size={15}
                      >
                        <thead>
                          <tr>
                            <th className="footable-visible footable-first-column footable-sortable">Số điện thoại</th>
                            <th className="footable-visible footable-sortable">Họ tên</th>
                            <th className="footable-visible footable-sortable">Thành phố</th>
                            <th className="footable-visible footable-sortable">Quận huyện</th>
                            <th className="footable-visible footable-sortable"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.userProfileList.map((userProfile, i) => (
                            <tr key={`id-${i}`} className="footable-even" style={{}}>
                              <td className="footable-visible footable-first-column">
                                <span className="footable-toggle" />
                                {userProfile.mobile}
                              </td>
                              <td className="footable-visible">{userProfile.fullName}</td>
                              <td className="footable-visible">{userProfile.cityName}</td>
                              <td className="footable-visible">{userProfile.districtName}</td>
                              <td className="footable-visible">
                                <div className="input-group-btn">
                                  <button className="btn btn-primary" type="button" onClick={this.topupClick}>
                                    <i className="fa fa-search" /> Tìm kiếm
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </div>
            </div>{' '}
          </div>
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  currencyRateEntity: storeState.currencyRate.entity,
  userBalanceEntity: storeState.userBalance.entity,
  userProfileList: storeState.userProfile.entities,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, reset, getUserByMobile };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankTransfer);
