import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IOrderCart } from 'app/shared/model/order-cart.model';
import { getEntities as getOrderCarts } from 'app/entities/order-cart/order-cart.reducer';
import { IWarehouse } from 'app/shared/model/warehouse.model';
import { getEntities as getWarehouses } from 'app/entities/warehouse/warehouse.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IDelivery } from 'app/shared/model/delivery.model';
import { getEntities as getDeliveries } from 'app/entities/delivery/delivery.reducer';
import { getEntity, updateEntity, createEntity, reset } from './order-package.reducer';
import { IOrderPackage } from 'app/shared/model/order-package.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOrderPackageUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IOrderPackageUpdateState {
  isNew: boolean;
  orderCartId: string;
  warehouseId: string;
  createById: string;
  updateById: string;
  deliveryId: string;
}

export class OrderPackageUpdate extends React.Component<IOrderPackageUpdateProps, IOrderPackageUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      orderCartId: '0',
      warehouseId: '0',
      createById: '0',
      updateById: '0',
      deliveryId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getOrderCarts();
    this.props.getWarehouses();
    this.props.getUsers();
    this.props.getDeliveries();
  }

  saveEntity = (event, errors, values) => {
    values.createAt = new Date(values.createAt);
    values.updateAt = new Date(values.updateAt);

    if (errors.length === 0) {
      const { orderPackageEntity } = this.props;
      const entity = {
        ...orderPackageEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/order-package');
  };

  render() {
    const { orderPackageEntity, orderCarts, warehouses, users, deliveries, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="studentexchangeApp.orderPackage.home.createOrEditLabel">
              <Translate contentKey="studentexchangeApp.orderPackage.home.createOrEditLabel">Create or edit a OrderPackage</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : orderPackageEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="order-package-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="ladingCodeLabel" for="ladingCode">
                    <Translate contentKey="studentexchangeApp.orderPackage.ladingCode">Lading Code</Translate>
                  </Label>
                  <AvField id="order-package-ladingCode" type="text" name="ladingCode" />
                </AvGroup>
                <AvGroup>
                  <Label id="heightPackageLabel" for="heightPackage">
                    <Translate contentKey="studentexchangeApp.orderPackage.heightPackage">Height Package</Translate>
                  </Label>
                  <AvField id="order-package-heightPackage" type="string" className="form-control" name="heightPackage" />
                </AvGroup>
                <AvGroup>
                  <Label id="widthPackageLabel" for="widthPackage">
                    <Translate contentKey="studentexchangeApp.orderPackage.widthPackage">Width Package</Translate>
                  </Label>
                  <AvField id="order-package-widthPackage" type="string" className="form-control" name="widthPackage" />
                </AvGroup>
                <AvGroup>
                  <Label id="lengthPackageLabel" for="lengthPackage">
                    <Translate contentKey="studentexchangeApp.orderPackage.lengthPackage">Length Package</Translate>
                  </Label>
                  <AvField id="order-package-lengthPackage" type="string" className="form-control" name="lengthPackage" />
                </AvGroup>
                <AvGroup>
                  <Label id="netWeightLabel" for="netWeight">
                    <Translate contentKey="studentexchangeApp.orderPackage.netWeight">Net Weight</Translate>
                  </Label>
                  <AvField id="order-package-netWeight" type="string" className="form-control" name="netWeight" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="status">
                    <Translate contentKey="studentexchangeApp.orderPackage.status">Status</Translate>
                  </Label>
                  <AvField id="order-package-status" type="text" name="status" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusNameLabel" for="statusName">
                    <Translate contentKey="studentexchangeApp.orderPackage.statusName">Status Name</Translate>
                  </Label>
                  <AvField id="order-package-statusName" type="text" name="statusName" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusStyleLabel" for="statusStyle">
                    <Translate contentKey="studentexchangeApp.orderPackage.statusStyle">Status Style</Translate>
                  </Label>
                  <AvField id="order-package-statusStyle" type="text" name="statusStyle" />
                </AvGroup>
                <AvGroup>
                  <Label id="createAtLabel" for="createAt">
                    <Translate contentKey="studentexchangeApp.orderPackage.createAt">Create At</Translate>
                  </Label>
                  <AvInput
                    id="order-package-createAt"
                    type="datetime-local"
                    className="form-control"
                    name="createAt"
                    value={isNew ? null : convertDateTimeFromServer(this.props.orderPackageEntity.createAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updateAtLabel" for="updateAt">
                    <Translate contentKey="studentexchangeApp.orderPackage.updateAt">Update At</Translate>
                  </Label>
                  <AvInput
                    id="order-package-updateAt"
                    type="datetime-local"
                    className="form-control"
                    name="updateAt"
                    value={isNew ? null : convertDateTimeFromServer(this.props.orderPackageEntity.updateAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="orderCart.id">
                    <Translate contentKey="studentexchangeApp.orderPackage.orderCart">Order Cart</Translate>
                  </Label>
                  <AvInput id="order-package-orderCart" type="select" className="form-control" name="orderCartId">
                    <option value="" key="0" />
                    {orderCarts
                      ? orderCarts.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="warehouse.id">
                    <Translate contentKey="studentexchangeApp.orderPackage.warehouse">Warehouse</Translate>
                  </Label>
                  <AvInput id="order-package-warehouse" type="select" className="form-control" name="warehouseId">
                    <option value="" key="0" />
                    {warehouses
                      ? warehouses.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="createBy.login">
                    <Translate contentKey="studentexchangeApp.orderPackage.createBy">Create By</Translate>
                  </Label>
                  <AvInput id="order-package-createBy" type="select" className="form-control" name="createById">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="updateBy.login">
                    <Translate contentKey="studentexchangeApp.orderPackage.updateBy">Update By</Translate>
                  </Label>
                  <AvInput id="order-package-updateBy" type="select" className="form-control" name="updateById">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="delivery.id">
                    <Translate contentKey="studentexchangeApp.orderPackage.delivery">Delivery</Translate>
                  </Label>
                  <AvInput id="order-package-delivery" type="select" className="form-control" name="deliveryId">
                    <option value="" key="0" />
                    {deliveries
                      ? deliveries.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/order-package" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  orderCarts: storeState.orderCart.entities,
  warehouses: storeState.warehouse.entities,
  users: storeState.userManagement.users,
  deliveries: storeState.delivery.entities,
  orderPackageEntity: storeState.orderPackage.entity,
  loading: storeState.orderPackage.loading,
  updating: storeState.orderPackage.updating,
  updateSuccess: storeState.orderPackage.updateSuccess
});

const mapDispatchToProps = {
  getOrderCarts,
  getWarehouses,
  getUsers,
  getDeliveries,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderPackageUpdate);
