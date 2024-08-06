import {
  SET_ALL_ORDER,
  RESET_ALL_ORDER,
  SET_TRACK_ORDER,
  RESET_TRACK_ORDER,
  SET_ORDER_BY_STATUS,
  RESET_ORDER_STATUS,
} from "../Types/ShipmentTypes";

const initialState = {
  allOrders: [],
  orderByStatus: null,
  trackOrder: null,
};

const ShipmentReducer = (state = initialState, action) => {
  if (action.type === SET_ALL_ORDER) {
    return { ...state, allOrders: action.payLoad };
  } else if (action.type === RESET_ALL_ORDER) {
    return { ...state, allOrders: [] };
  } else if (action.type === SET_TRACK_ORDER) {
    return { ...state, trackOrder: action.payLoad };
  } else if (action.type === RESET_TRACK_ORDER) {
    return { ...state, trackOrder: null };
  } else if (action.type === SET_ORDER_BY_STATUS) {
    return { ...state, orderByStatus: action.payLoad };
  } else if (action.type === RESET_ORDER_STATUS) {
    return { ...state, orderByStatus: null };
  } else {
    return state;
  }
};

export default ShipmentReducer;
