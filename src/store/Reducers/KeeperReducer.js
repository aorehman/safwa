import {
  RESET_COURIERS,
  RESET_KEEPER_COURIER_DELIVER,
  RESET_KEEPER_COURIER_RETURN,
  RESET_KEEPER_DESTINATION,
  RESET_KEEPER_ORDERS,
  RESET_KEEPER_ORDERS_DELIVER,
  RESET_KEEPER_ORDERS_DESTINATION,
  RESET_KEEPER_ORDERS_ORIGIN,
  RESET_KEEPER_ORDERS_RECEIVE,
  RESET_KEEPER_ORDERS_RETURN,
  RESET_KEEPER_ORIGIN,
  RESET_KEEPER_PICKUP_ORDERS,
  RESET_KEEPER_RECEIVE_BOUND,
  RESET_KEEPER_STORE_ORDERS,
  RESET_KEEPER_TRANSIT_DESTINATION,
  RESET_RTW_ORDERS,
  SET_COURIERS,
  SET_KEEPER_COURIER_DELIVER,
  SET_KEEPER_COURIER_RETURN,
  SET_KEEPER_DESTINATION,
  SET_KEEPER_ORDERS,
  SET_KEEPER_ORDERS_DELIVER,
  SET_KEEPER_ORDERS_DESTINATION,
  SET_KEEPER_ORDERS_ORIGIN,
  SET_KEEPER_ORDERS_RECEIVE,
  SET_KEEPER_ORDERS_RETURN,
  SET_KEEPER_ORIGIN,
  SET_KEEPER_PICKUP_ORDERS,
  SET_KEEPER_RECEIVE_BOUND,
  SET_KEEPER_STORE_ORDERS,
  SET_KEEPER_TRANSIT_DESTINATION,
  SET_RTW_ORDERS,
} from "../Types/KeeperTypes";

const initialState = {
  couriers: [],
  keeperOrders: null,
  keeperPickupOrders: [],
  keeperOrdersReceive: [],
  keeperReceiveInBound: [],
  keeperOrdersDeliver: null,
  keeperCourierForDeliver: [],
  keeperOrdersReturn: null,
  keeperCourierForReturn: [],
  keeperStoreOrders: null,
  keeperOrdersDestination: [],
  keeperTransitDestination: [],
  keeperOrdersOrigin: [],
  keeperTransitOrigin: [],
  rtwOrders: [],
};

const KeeperReducer = (state = initialState, action) => {
  if (action.type === SET_COURIERS) {
    return { ...state, couriers: action.payLoad };
  } else if (action.type === RESET_COURIERS) {
    return { ...state, couriers: [] };
  } else if (action.type === SET_KEEPER_ORDERS) {
    return { ...state, keeperOrders: action.payLoad };
  } else if (action.type === RESET_KEEPER_ORDERS) {
    return { ...state, keeperOrders: null };
  } else if (action.type === SET_KEEPER_PICKUP_ORDERS) {
    return { ...state, keeperPickupOrders: action.payLoad };
  } else if (action.type === RESET_KEEPER_PICKUP_ORDERS) {
    return { ...state, keeperPickupOrders: [] };
  } else if (action.type === SET_KEEPER_ORDERS_RECEIVE) {
    return { ...state, keeperOrdersReceive: action.payLoad };
  } else if (action.type === RESET_KEEPER_ORDERS_RECEIVE) {
    return { ...state, keeperOrdersReceive: [] };
  } else if (action.type === SET_KEEPER_RECEIVE_BOUND) {
    return { ...state, keeperReceiveInBound: action.payLoad };
  } else if (action.type === RESET_KEEPER_RECEIVE_BOUND) {
    return { ...state, keeperReceiveInBound: [] };
  } else if (action.type === SET_KEEPER_ORDERS_DELIVER) {
    return { ...state, keeperOrdersDeliver: action.payLoad };
  } else if (action.type === RESET_KEEPER_ORDERS_DELIVER) {
    return { ...state, keeperOrdersDeliver: null };
  } else if (action.type === SET_KEEPER_COURIER_DELIVER) {
    return { ...state, keeperCourierForDeliver: action.payLoad };
  } else if (action.type === RESET_KEEPER_COURIER_DELIVER) {
    return { ...state, keeperCourierForDeliver: [] };
  } else if (action.type === SET_KEEPER_ORDERS_RETURN) {
    return { ...state, keeperOrdersReturn: action.payLoad };
  } else if (action.type === RESET_KEEPER_ORDERS_RETURN) {
    return { ...state, keeperOrdersReturn: null };
  } else if (action.type === SET_KEEPER_COURIER_RETURN) {
    return { ...state, keeperCourierForReturn: action.payLoad };
  } else if (action.type === RESET_KEEPER_COURIER_RETURN) {
    return { ...state, keeperCourierForReturn: [] };
  } else if (action.type === SET_KEEPER_STORE_ORDERS) {
    return { ...state, keeperStoreOrders: action.payLoad };
  } else if (action.type === RESET_KEEPER_STORE_ORDERS) {
    return { ...state, keeperStoreOrders: null };
  } else if (action.type === SET_KEEPER_ORDERS_DESTINATION) {
    return { ...state, keeperOrdersDestination: action.payLoad };
  } else if (action.type === RESET_KEEPER_ORDERS_DESTINATION) {
    return { ...state, keeperOrdersDestination: [] };
  } else if (action.type === SET_KEEPER_DESTINATION) {
    return { ...state, keeperTransitDestination: action.payLoad };
  } else if (action.type === RESET_KEEPER_DESTINATION) {
    return { ...state, keeperTransitDestination: [] };
  } else if (action.type === SET_KEEPER_ORDERS_ORIGIN) {
    return { ...state, keeperOrdersOrigin: action.payLoad };
  } else if (action.type === RESET_KEEPER_ORDERS_ORIGIN) {
    return { ...state, keeperOrdersOrigin: [] };
  } else if (action.type === SET_KEEPER_ORIGIN) {
    return { ...state, keeperTransitOrigin: action.payLoad };
  } else if (action.type === RESET_KEEPER_ORIGIN) {
    return { ...state, keeperTransitOrigin: [] };
  } else if (action.type === SET_RTW_ORDERS) {
    return { ...state, rtwOrders: action.payLoad };
  } else if (action.type === RESET_RTW_ORDERS) {
    return { ...state, rtwOrders: [] };
  } else {
    return state;
  }
};

export default KeeperReducer;
