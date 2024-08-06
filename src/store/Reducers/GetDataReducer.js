import {
  SET_CITIES,
  SET_NEIGHBORHOODS,
  RESET_CITIES,
  RESET_NEIGHBORHOODS,
  SET_ZONES,
  RESET_ZONES,
  SET_USER_ADDRESSES,
  RESET_USER_ADDRESSES,
  SET_PACKAGE_TYPES,
  RESET_PACKAGE_TYPES,
  SET_STORE,
  RESET_STORE,
  SET_PROVINCE,
  RESET_PROVINCE,
  RESET_B_CLIENT,
  SET_B_CLIENT,
} from "../Types/GetDataTypes";

const initialState = {
  cities: [],
  neighborhoods: [],
  zones: [],
  userAddresses: [],
  packageTypes: [],
  stores: [],
  provinces: [],
  bClientList: [],
};

const GetDataReducer = (state = initialState, action) => {
  if (action.type === SET_CITIES) {
    return { ...state, cities: action.payLoad };
  } else if (action.type === RESET_CITIES) {
    return { ...state, cities: [] };
  } else if (action.type === SET_NEIGHBORHOODS) {
    return { ...state, neighborhoods: action.payLoad };
  } else if (action.type === RESET_NEIGHBORHOODS) {
    return { ...state, neighborhoods: [] };
  } else if (action.type === SET_ZONES) {
    return { ...state, zones: action.payLoad };
  } else if (action.type === RESET_ZONES) {
    return { ...state, zones: [] };
  } else if (action.type === SET_USER_ADDRESSES) {
    return { ...state, userAddresses: action.payLoad };
  } else if (action.type === RESET_USER_ADDRESSES) {
    return { ...state, userAddresses: [] };
  } else if (action.type === SET_PACKAGE_TYPES) {
    return { ...state, packageTypes: action.payLoad };
  } else if (action.type === RESET_PACKAGE_TYPES) {
    return { ...state, packageTypes: [] };
  } else if (action.type === SET_STORE) {
    return { ...state, stores: action.payLoad };
  } else if (action.type === RESET_STORE) {
    return { ...state, stores: [] };
  } else if (action.type === SET_PROVINCE) {
    return { ...state, provinces: action.payLoad };
  } else if (action.type === RESET_PROVINCE) {
    return { ...state, provinces: [] };
  } else if (action.type === SET_B_CLIENT) {
    return { ...state, bClientList: action.payLoad };
  } else {
    return state;
  }
};

export default GetDataReducer;
