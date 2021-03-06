import React from 'react';
import { connect } from 'react-redux';
import { NavLink as Link } from 'react-router-dom';

import { Checkbox } from 'antd';

import { getSession } from 'app/shared/reducers/authentication';
import { getOwnerEntities, reset } from 'app/entities/shopping-cart/shopping-cart.reducer';
import { decreaseQuantity, increaseQuantity } from 'app/entities/shopping-cart-item/shopping-cart-item.reducer';
import { formatCurency, encodeId } from 'app/shared/util/utils';

import Header from 'app/shared/layout/header/header';
import Sidebar from 'app/shared/layout/sidebar/sidebar';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Cart extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getOwnerEntities();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  decreaseQuantityClick = (id: number) => {
    this.props.decreaseQuantity({ id });
  };

  increaseQuantityClick = (id: number) => {
    this.props.increaseQuantity({ id });
  };

  render() {
    const { shoppingCartList, account } = this.props;
    return (
      <>
        <Sidebar activeMenu="" activeSubMenu="shopping-cart" />
        <div id="page-wrapper" className="gray-bg dashbard-1">
          <Header />
          <div className="row border-bottom white-bg dashboard-header">
            <Link to={'/checkout'}>
              <button className="btn btn-primary btn-block m-t checkout-cart">
                <i className="fa fa-shopping-cart" /> Đặt tất cả hàng
              </button>
            </Link>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <div className="row wrapper wrapper-content animated fadeInRight">
                {this.props.shoppingCartList.length === 0 ? (
                  <div className="ibox">
                    <div className="ibox-content">
                      <div className="no-content">Không có hàng trong giỏ</div>
                    </div>
                  </div>
                ) : (
                  shoppingCartList.map((shoppingCart, ii) => (
                    <div key={`entity-${ii}`}>
                      <div className="col-xs-12 col-md-8">
                        <div className="ibox float-e-margins">
                          <div className="ibox-title">
                            <h5>
                              <i className="fa fa-home" />
                              <a href={shoppingCart.shopLink} target="_blank">{`${shoppingCart.aliwangwang}`}</a>
                            </h5>
                            <div className="ibox-tools">
                              <span className="label label-warning-light pull-right">
                                {`${shoppingCart.items.length}`} mặt hàng trong giỏ
                              </span>
                            </div>
                          </div>
                          <div className="ibox-content">
                            <div>
                              <div className="feed-activity-list">
                                {shoppingCart.items.map((item, iy) => (
                                  <div className="feed-element" key={`entity-${iy}`}>
                                    <a href={item.itemLink} className="pull-left" target="_blank">
                                      <img
                                        alt="image"
                                        className="img-circle"
                                        src={`${item.propertiesImage ? item.propertiesImage : item.itemImage}`}
                                      />
                                    </a>
                                    <div className="media-body ">
                                      <small className="pull-right">
                                        <div className="input-group bootstrap-touchspin">
                                          <span className="input-group-btn">
                                            <button
                                              className="btn btn-default bootstrap-touchspin-down"
                                              disabled={item.quantity > 1 ? false : true}
                                              onClick={this.decreaseQuantityClick.bind(this, item.id)}
                                              type="button"
                                            >
                                              -
                                            </button>
                                          </span>
                                          <input type="tel" className="form-control quantity" disabled min="1" value={`${item.quantity}`} />
                                          <span className="input-group-btn">
                                            <button
                                              className="btn btn-default bootstrap-touchspin-up"
                                              onClick={this.increaseQuantityClick.bind(this, item.id)}
                                              type="button"
                                            >
                                              +
                                            </button>
                                          </span>
                                        </div>
                                      </small>
                                      <a href={item.itemLink} target="_blank">
                                        <strong>{`${item.itemName}`}</strong>
                                      </a>
                                      <br />
                                      <small className="text-muted">
                                        Thuộc tính: {`${item.propertiesName}`}({`${item.propertiesType}`})<br />
                                        Số lượng: {`${item.quantity}`}
                                        <br />
                                        Đơn giá: ¥{`${item.itemPriceNDT}`}
                                        <br />
                                        <span className="label label-danger">
                                          <i className="fa fa-trash" /> Xoá
                                        </span>
                                      </small>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xs-12 col-md-4">
                        <div className="row checkout-cart-detail">
                          <span className="checkout-cart">
                            <Link to={`/checkout?shopid=${encodeId(shoppingCart.id)}`}>
                              <button className="btn btn-primary btn-block">
                                <i className="fa fa-shopping-cart" /> Đặt hàng
                              </button>
                            </Link>
                          </span>
                          <ul className="list-group clear-list m-t">
                            <li className="list-group-item">
                              <span className="pull-right">
                                <b>{formatCurency(shoppingCart.totalAmount)}đ</b>
                              </span>
                              Tiền hàng:
                            </li>
                            <li className="list-group-item">
                              <span className="pull-right">
                                <b>{formatCurency(shoppingCart.serviceFee)}đ</b>
                              </span>
                              Phí mua hàng:
                            </li>
                            <li className="list-group-item">
                              <span className="pull-right">
                                <b>{formatCurency(shoppingCart.tallyFee)}đ</b>
                              </span>
                              Phí kiểm đếm:
                            </li>
                            <li className="list-group-item">
                              <span className="pull-right">
                                <b>0đ</b>
                              </span>
                              Phí vận chuyển nội địa TQ:
                            </li>
                            <li className="list-group-item">
                              <span className="pull-right">
                                <b>0đ</b>
                              </span>
                              Phí đóng kiện gỗ:
                            </li>
                            <li className="list-group-item">
                              <span className="pull-right">
                                <b>0đ</b>
                              </span>
                              Phí vận chuyển TQ - VN:
                            </li>
                            <li className="list-group-item">
                              <span className="pull-right">
                                <b>0đ</b>
                              </span>
                              Phí vận chuyển nội địa VN:
                            </li>
                          </ul>
                        </div>
                        <div className="row checkout-cart-detail checkout-cart-total">
                          <div className="col-xs-8 item">
                            <h4>Tổng tiền:</h4>
                          </div>
                          <div className="col-xs-4 item">
                            <b>{formatCurency(shoppingCart.finalAmount)}đ</b>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="footer">
                <div className="pull-right">
                  10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                  <strong>Copyright</strong> Example Company © 2014-2017
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  shoppingCartList: storeState.shoppingCart.entities,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, getOwnerEntities, reset, decreaseQuantity, increaseQuantity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart);
