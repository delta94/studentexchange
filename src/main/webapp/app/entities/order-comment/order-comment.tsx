import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './order-comment.reducer';
import { IOrderComment } from 'app/shared/model/order-comment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOrderCommentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class OrderComment extends React.Component<IOrderCommentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { orderCommentList, match } = this.props;
    return (
      <div>
        <h2 id="order-comment-heading">
          <Translate contentKey="studentexchangeApp.orderComment.home.title">Order Comments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="studentexchangeApp.orderComment.home.createLabel">Create new Order Comment</Translate>
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
                  <Translate contentKey="studentexchangeApp.orderComment.message">Message</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderComment.sender">Sender</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderComment.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderComment.createAt">Create At</Translate>
                </th>
                <th>
                  <Translate contentKey="studentexchangeApp.orderComment.orderCart">Order Cart</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orderCommentList.map((orderComment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${orderComment.id}`} color="link" size="sm">
                      {orderComment.id}
                    </Button>
                  </td>
                  <td>{orderComment.message}</td>
                  <td>{orderComment.sender}</td>
                  <td>
                    <Translate contentKey={`studentexchangeApp.CommentType.${orderComment.type}`} />
                  </td>
                  <td>
                    <TextFormat type="date" value={orderComment.createAt} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    {orderComment.orderCartId ? <Link to={`order-cart/${orderComment.orderCartId}`}>{orderComment.orderCartId}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${orderComment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderComment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${orderComment.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ orderComment }: IRootState) => ({
  orderCommentList: orderComment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderComment);
