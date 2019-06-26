import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-shipping-address.reducer';
import { IUserShippingAddress } from 'app/shared/model/user-shipping-address.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserShippingAddressDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserShippingAddressDetail extends React.Component<IUserShippingAddressDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userShippingAddressEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="studentexchangeApp.userShippingAddress.detail.title">UserShippingAddress</Translate> [
            <b>{userShippingAddressEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="studentexchangeApp.userShippingAddress.name">Name</Translate>
              </span>
            </dt>
            <dd>{userShippingAddressEntity.name}</dd>
            <dt>
              <span id="address">
                <Translate contentKey="studentexchangeApp.userShippingAddress.address">Address</Translate>
              </span>
            </dt>
            <dd>{userShippingAddressEntity.address}</dd>
            <dt>
              <span id="mobile">
                <Translate contentKey="studentexchangeApp.userShippingAddress.mobile">Mobile</Translate>
              </span>
            </dt>
            <dd>{userShippingAddressEntity.mobile}</dd>
            <dt>
              <span id="note">
                <Translate contentKey="studentexchangeApp.userShippingAddress.note">Note</Translate>
              </span>
            </dt>
            <dd>{userShippingAddressEntity.note}</dd>
            <dt>
              <span id="createAt">
                <Translate contentKey="studentexchangeApp.userShippingAddress.createAt">Create At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={userShippingAddressEntity.createAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updateAt">
                <Translate contentKey="studentexchangeApp.userShippingAddress.updateAt">Update At</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={userShippingAddressEntity.updateAt} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userShippingAddress.userProfile">User Profile</Translate>
            </dt>
            <dd>{userShippingAddressEntity.userProfileId ? userShippingAddressEntity.userProfileId : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userShippingAddress.createBy">Create By</Translate>
            </dt>
            <dd>{userShippingAddressEntity.createByLogin ? userShippingAddressEntity.createByLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userShippingAddress.updateBy">Update By</Translate>
            </dt>
            <dd>{userShippingAddressEntity.updateByLogin ? userShippingAddressEntity.updateByLogin : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userShippingAddress.city">City</Translate>
            </dt>
            <dd>{userShippingAddressEntity.cityName ? userShippingAddressEntity.cityName : ''}</dd>
            <dt>
              <Translate contentKey="studentexchangeApp.userShippingAddress.district">District</Translate>
            </dt>
            <dd>{userShippingAddressEntity.districtName ? userShippingAddressEntity.districtName : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/user-shipping-address" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-shipping-address/${userShippingAddressEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userShippingAddress }: IRootState) => ({
  userShippingAddressEntity: userShippingAddress.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserShippingAddressDetail);
