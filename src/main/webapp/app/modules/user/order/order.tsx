import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
// tslint:disable-next-line:no-unused-variable
import { TextFormat, getSortState, IPaginationBaseState, getPaginationItemsNumber, JhiPagination } from 'react-jhipster';
import { formatCurency, encodeId } from 'app/shared/util/utils';

import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

import { IRootState } from 'app/shared/reducers';
import { getOwnerEntities, searchOrder, updateBuying, reset } from 'app/entities/order-cart/order-cart.reducer';
import { OrderStatus } from 'app/shared/model/order-cart.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IOrderCartProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IOrderCartState = IPaginationBaseState;

export class OrderCart extends React.Component<IOrderCartProps, IOrderCartState> {
  state: IOrderCartState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage } = this.state;
    this.props.getOwnerEntities(activePage - 1, itemsPerPage, `createAt,asc`);
  };

  receiveOrderClick = id => {
    this.props.history.push(`/order-detail?orderid=${encodeId(id)}`);
  };

  onChangeCode = () => {};

  searchClick = () => {};

  render() {
    const { orderCartList, match, totalItems } = this.props;
    return (
      <>
        <Sidebar activeMenu="" activeSubMenu="order-cart" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <div className="row  border-bottom white-bg dashboard-header">
            <h3>Danh sách đơn hàng</h3>
          </div>
          <div className="wrapper wrapper-content animated fadeInRight ecommerce">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox">
                  <div className="ibox-content">
                    <table className="footable table table-stripped toggle-arrow-tiny tablet breakpoint footable-loaded">
                      <thead>
                        <tr>
                          <th>Mã đơn hàng</th>
                          <th>
                            <i className="fa fa-user" /> Khách hàng
                          </th>
                          <th>
                            Tiền cọc <b className="text-danger">(70%)</b>
                          </th>
                          <th>Ngày đặt</th>
                          <th>Trạng thái</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {orderCartList.map((orderCart, i) => (
                          <tr key={`id-${i}`}>
                            <td>{orderCart.code}</td>
                            <td>
                              {orderCart.receiverName}
                              <br />
                              <i className="fa fa-phone" /> {orderCart.receiverMobile}
                            </td>
                            <td>{formatCurency(orderCart.depositAmount)}đ</td>
                            <td>
                              <small>
                                <TextFormat type="date" value={orderCart.depositTime} format={APP_DATE_FORMAT} />
                              </small>
                            </td>
                            <td>
                              {orderCart.status === OrderStatus.DEPOSITED || orderCart.status === OrderStatus.ARE_BUYING ? (
                                <small className="badge">Chưa mua hàng</small>
                              ) : orderCart.status === OrderStatus.CANCELLED ? (
                                <small className="badge badge-danger">Đã huỷ</small>
                              ) : (
                                <>
                                  {orderCart.shippingChinaCode}
                                  <br />
                                  <small className="text-warning">
                                    <b>{orderCart.website}</b>
                                  </small>
                                </>
                              )}
                            </td>
                            <td>
                              <Link to={`/order-detail?orderid=${encodeId(orderCart.id)}`}>
                                <span className="label label-info">
                                  <i className="fa fa-angle-double-right" /> Chi tiết đơn hàng
                                </span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={7}>
                            <ul className="pagination pull-right">
                              <JhiPagination
                                items={getPaginationItemsNumber(totalItems, this.state.itemsPerPage)}
                                activePage={this.state.activePage}
                                onSelect={this.handlePagination}
                                maxButtons={5}
                              />
                            </ul>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12">
              <Footer />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ orderCart, authentication }: IRootState) => ({
  orderCartList: orderCart.entities,
  totalItems: orderCart.totalItems,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {
  getOwnerEntities,
  searchOrder,
  updateBuying,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderCart);
