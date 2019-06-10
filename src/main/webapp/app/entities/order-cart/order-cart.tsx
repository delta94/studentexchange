import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './order-cart.reducer';
import { IOrderCart } from 'app/shared/model/order-cart.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderCartProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class OrderCart extends React.Component<IOrderCartProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { orderCartList, match } = this.props;
    return (
      <div>
        <h2 id="order-cart-heading">
          <Translate contentKey="studentexchangeApp.orderCart.home.title">Order Carts</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="studentexchangeApp.orderCart.home.createLabel">Create new Order Cart</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.code">Code</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.avatar">Avatar</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.amountDiscount">Amount Discount</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.amountPaid">Amount Paid</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.depositAmount">Deposit Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.depositRatio">Deposit Ratio</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.depositTime">Deposit Time</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.domesticShippingChinaFeeNDT">
                    Domestic Shipping China Fee NDT
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.domesticShippingChinaFee">Domestic Shipping China Fee</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.domesticShippingVietnamFee">Domestic Shipping Vietnam Fee</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.quantityOrder">Quantity Order</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.quantityPending">Quantity Pending</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.quantityReceived">Quantity Received</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.rate">Rate</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.receiverName">Receiver Name</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.receiverAddress">Receiver Address</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.receiverMobile">Receiver Mobile</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.receiverNote">Receiver Note</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.refundAmountByAlipay">Refund Amount By Alipay</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.refundAmountByComplaint">Refund Amount By Complaint</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.refundAmountByOrder">Refund Amount By Order</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.refundAmountPending">Refund Amount Pending</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.shippingChinaVietnamFee">Shipping China Vietnam Fee</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.shippingChinaVietnamFeeDiscount">
                    Shipping China Vietnam Fee Discount
                  </Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.shopAliwang">Shop Aliwang</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.shopId">Shop Id</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.shopLink">Shop Link</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.shopName">Shop Name</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.website">Website</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.websiteCode">Website Code</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.websiteLadingCode">Website Lading Code</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.statusName">Status Name</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.statusStyle">Status Style</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.tallyFee">Tally Fee</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.totalAmount">Total Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.totalAmountNDT">Total Amount NDT</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.totalPaidByCustomer">Total Paid By Customer</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.serviceFee">Service Fee</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.serviceFeeDiscount">Service Fee Discount</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.totalServiceFee">Total Service Fee</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.finalAmount">Final Amount</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.createAt">Create At</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.updateAt">Update At</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.buyer">Buyer</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.chinaStocker">China Stocker</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.vietnamStocker">Vietnam Stocker</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.exporter">Exporter</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.createBy">Create By</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderCart.updateBy">Update By</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orderCartList.map((orderCart, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${orderCart.id}`} color="link" size="sm">
                      {orderCart.id}
                    </Button>
                  </td>
                  <td>{orderCart.code}</td>
                  <td>{orderCart.avatar}</td>
                  <td>{orderCart.amountDiscount}</td>
                  <td>{orderCart.amountPaid}</td>
                  <td>{orderCart.depositAmount}</td>
                  <td>{orderCart.depositRatio}</td>
                  <td>
                    <TextFormat type="date" value={orderCart.depositTime} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{orderCart.domesticShippingChinaFeeNDT}</td>
                  <td>{orderCart.domesticShippingChinaFee}</td>
                  <td>{orderCart.domesticShippingVietnamFee}</td>
                  <td>{orderCart.quantityOrder}</td>
                  <td>{orderCart.quantityPending}</td>
                  <td>{orderCart.quantityReceived}</td>
                  <td>{orderCart.rate}</td>
                  <td>{orderCart.receiverName}</td>
                  <td>{orderCart.receiverAddress}</td>
                  <td>{orderCart.receiverMobile}</td>
                  <td>{orderCart.receiverNote}</td>
                  <td>{orderCart.refundAmountByAlipay}</td>
                  <td>{orderCart.refundAmountByComplaint}</td>
                  <td>{orderCart.refundAmountByOrder}</td>
                  <td>{orderCart.refundAmountPending}</td>
                  <td>{orderCart.shippingChinaVietnamFee}</td>
                  <td>{orderCart.shippingChinaVietnamFeeDiscount}</td>
                  <td>{orderCart.shopAliwang}</td>
                  <td>{orderCart.shopId}</td>
                  <td>{orderCart.shopLink}</td>
                  <td>{orderCart.shopName}</td>
                  <td>{orderCart.website}</td>
                  <td>{orderCart.websiteCode}</td>
                  <td>{orderCart.websiteLadingCode}</td>
                  <td>
                    <Translate contentKey={`studentexchangeApp.OrderStatus.${orderCart.status}`} />
                  </td>
                  <td>{orderCart.statusName}</td>
                  <td>{orderCart.statusStyle}</td>
                  <td>{orderCart.tallyFee}</td>
                  <td>{orderCart.totalAmount}</td>
                  <td>{orderCart.totalAmountNDT}</td>
                  <td>{orderCart.totalPaidByCustomer}</td>
                  <td>{orderCart.serviceFee}</td>
                  <td>{orderCart.serviceFeeDiscount}</td>
                  <td>{orderCart.totalServiceFee}</td>
                  <td>{orderCart.finalAmount}</td>
                  <td>
                    <TextFormat type="date" value={orderCart.createAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={orderCart.updateAt} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{orderCart.buyerLogin ? orderCart.buyerLogin : ''}</td>
                  <td>{orderCart.chinaStockerLogin ? orderCart.chinaStockerLogin : ''}</td>
                  <td>{orderCart.vietnamStockerLogin ? orderCart.vietnamStockerLogin : ''}</td>
                  <td>{orderCart.exporterLogin ? orderCart.exporterLogin : ''}</td>
                  <td>{orderCart.createByLogin ? orderCart.createByLogin : ''}</td>
                  <td>{orderCart.updateByLogin ? orderCart.updateByLogin : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${orderCart.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderCart.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderCart.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ orderCart }: IRootState) => ({
  orderCartList: orderCart.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderCart);
