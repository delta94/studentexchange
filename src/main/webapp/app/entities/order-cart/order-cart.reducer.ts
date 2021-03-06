import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, ICrudSearchAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOrderCart, defaultValue } from 'app/shared/model/order-cart.model';

export const ACTION_TYPES = {
  FETCH_ORDERCART_LIST: 'orderCart/FETCH_ORDERCART_LIST',
  FETCH_ORDERCART: 'orderCart/FETCH_ORDERCART',
  CREATE_ORDERCART: 'orderCart/CREATE_ORDERCART',
  UPDATE_ORDERCART: 'orderCart/UPDATE_ORDERCART',
  DELETE_ORDERCART: 'orderCart/DELETE_ORDERCART',
  RESET: 'orderCart/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOrderCart>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type OrderCartState = Readonly<typeof initialState>;

// Reducer

export default (state: OrderCartState = initialState, action): OrderCartState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ORDERCART_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ORDERCART):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ORDERCART):
    case REQUEST(ACTION_TYPES.UPDATE_ORDERCART):
    case REQUEST(ACTION_TYPES.DELETE_ORDERCART):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ORDERCART_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ORDERCART):
    case FAILURE(ACTION_TYPES.CREATE_ORDERCART):
    case FAILURE(ACTION_TYPES.UPDATE_ORDERCART):
    case FAILURE(ACTION_TYPES.DELETE_ORDERCART):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERCART_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ORDERCART):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ORDERCART):
    case SUCCESS(ACTION_TYPES.UPDATE_ORDERCART):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ORDERCART):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/order-carts';

// Actions

export const getEntities: ICrudGetAllAction<IOrderCart> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERCART_LIST,
    payload: axios.get<IOrderCart>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const searchOrder: ICrudSearchAction<IOrderCart> = (query, page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ORDERCART_LIST,
  payload: axios.get<IOrderCart>(`${apiUrl}?${query}&page=${page}&size=${size}&sort=${sort}`)
});

export const getEntity: ICrudGetAction<IOrderCart> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERCART,
    payload: axios.get<IOrderCart>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOrderCart> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_ORDERCART_LIST,
    payload: axios.post(apiUrl, cleanEntity(entity)),
    meta: {
      successMessage: 'Đặt hàng thành công',
      errorMessage: 'Đặt hàng thất bại. Xin hãy kiểm tra lại'
    }
  });
  dispatch(getOwnerEntities());
  return result;
};

export const getOwnerEntities: ICrudGetAllAction<IOrderCart> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/owner${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERCART_LIST,
    payload: axios.get<IOrderCart>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const updateEntity: ICrudPutAction<IOrderCart> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDERCART,
    payload: axios.put(apiUrl, cleanEntity(entity)),
    meta: {
      successMessage: 'Cập nhật thông tin đơn hàng thành công',
      errorMessage: 'Cập nhật thông tin đơn hàng thất bại. Xin hãy kiểm tra lại'
    }
  });
  dispatch(getEntities());
  return result;
};

export const updateBuying: ICrudPutAction<IOrderCart> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDERCART,
    payload: axios.put(`${apiUrl}/buying`, cleanEntity(entity)),
    meta: {
      successMessage: 'Cập nhật thông tin người mua thành công',
      errorMessage: 'Cập nhật thông tin người mua thất bại. Xin hãy kiểm tra lại'
    }
  });
  // dispatch(getEntities());
  return result;
};

export const updatePurchased: ICrudPutAction<IOrderCart> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDERCART,
    payload: axios.put(`${apiUrl}/purchased`, cleanEntity(entity)),
    meta: {
      successMessage: 'Mua hàng thành công',
      errorMessage: 'Mua hàng thất bại. Xin hãy kiểm tra lại'
    }
  });
  dispatch(searchOrder(`status.equals=PURCHASED`, 0, 20, `createAt,desc`));
  return result;
};

export const updateCancel: ICrudPutAction<IOrderCart> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ORDERCART,
    payload: axios.put(`${apiUrl}/cancel`, cleanEntity(entity)),
    meta: {
      successMessage: 'Huỷ đơn hàng thành công',
      errorMessage: 'Huỷ đơn hàng thất bại. Xin hãy kiểm tra lại'
    }
  });
  dispatch(searchOrder(`status.equals=CANCELLED`, 0, 20, `createAt,desc`));
  return result;
};

export const getOwnerPurchasedEntities: ICrudGetAllAction<IOrderCart> = (page, size, sort) => {
  const requestUrl = `${apiUrl}/owner/purchased${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_ORDERCART_LIST,
    payload: axios.get<IOrderCart>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const deleteEntity: ICrudDeleteAction<IOrderCart> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ORDERCART,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
