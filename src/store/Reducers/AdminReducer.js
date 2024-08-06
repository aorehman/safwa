import {
  SET_COLLECTION_CHARGES,
  RESET_COLLECTION_CHARGES,
  RESET_KEPPER_LIST,
  SET_KEPPER_LIST,
  SET_SEARCH_OTP,
  RESET_SEARCH_OTP,
  SET_CREATE_PACKAGE_TYPES,
  RESET_CREATE_PACKAGE_TYPES,
  SET_STORE_LIST,
  RESET_STORE_LIST,
  SET_SPECIFIC_STORE,
  RESET_SPECIFIC_STORE,
  SET_SPECIFIC_KEEPER,
  RESET_SPECIFIC_KEEPER,
  SET_SPECIFIC_PACKAGE_ID,
  RESET_SPECIFIC_PACKAGE_ID,
  SET_SPECIFIC_City,
  RESET_SPECIFIC_City,
  SET_SPECIFIC_NEIGHBORHOOD,
  RESET_SPECIFIC_NEIGHBORHOOD,
  SET_NEIGHBORHOOD_LIST,
  RESET_NEIGHBORHOOD_LIST,
  SET_City_LIST,
  RESET_City_LIST,
  SET_PROVINCE_LIST,
  RESET_PROVINCE_LIST,
  SET_SPECIFIC_PROVINCE,
  RESET_SPECIFIC_PROVINCE,
  SET_ZONE_LIST,
  RESET_ZONE_LIST,
  SET_SPECIFIC_ZONE,
  RESET_SPECIFIC_ZONE,
  SET_CLIENT_LIST,
  RESET_CLIENT_LIST,
  SET_SPECIFIC_CLIENT,
  RESET_SPECIFIC_CLIENT,
  SET_COURIER_LIST,
  RESET_COURIER_LIST,
  SET_SPECIFIC_COURIER,
  RESET_SPECIFIC_COURIER,
  SET_AGREEMENT_LIST,
  RESET_AGREEMENT_LIST,
  RESET_CUSTOMERCARE_LIST,
  SET_CUSTOMERCARE_LIST,
  SET_CASHIER_LIST,
  RESET_CASHIER_LIST,
  SET_ACCOUNTANT_LIST,
  RESET_ACCOUNTANT_LIST,
} from "../Types/AdminTypes";
import { RESET_PACKAGE_TYPES, SET_PACKAGE_TYPES } from "../Types/AdminTypes";

const initialState = {
  keeperList: null,
  collectionCharges: [],
  packageTypes: null,
  collectionCharges: [],
  searchOtp: null,
  storeList: null,
  specificStore: null,
  specificKeeper: null,
  specificPackageId: [],
  cityList: null,
  specificCity: null,
  neighborhoodList: null,
  specificNeighborhood: null,
  provinceList: null,
  specificProvince: null,
  zoneList: null,
  specificZone: null,
  clientList: null,
  specificClient: null,
  courierList: null,
  agreementList: null,
  customerCareList: null,
  cashierList: null,
  accountantList: null,
};

const AdminReducer = (state = initialState, action) => {
  if (action.type === SET_KEPPER_LIST) {
    return { ...state, keeperList: action.payLoad };
  } else if (action.type === RESET_KEPPER_LIST) {
    return { ...state, keeperList: null };
  } else if (action.type === SET_COLLECTION_CHARGES) {
    return { ...state, collectionCharges: action.payLoad };
  } else if (action.type === RESET_COLLECTION_CHARGES) {
    return { ...state, collectionCharges: [] };
  } else if (action.type === SET_PACKAGE_TYPES) {
    return { ...state, packageTypes: action.payLoad };
  } else if (action.type === RESET_PACKAGE_TYPES) {
    return { ...state, packageTypes: [] };
  } else if (action.type === SET_CREATE_PACKAGE_TYPES) {
    return { ...state, createPackageTypes: action.payLoad };
  } else if (action.type === RESET_CREATE_PACKAGE_TYPES) {
    return { ...state, createPackageTypes: [] };
  } else if (action.type === SET_SEARCH_OTP) {
    return { ...state, searchOtp: action.payLoad };
  } else if (action.type === RESET_SEARCH_OTP) {
    return { ...state, searchOtp: null };
  } else if (action.type === SET_STORE_LIST) {
    return { ...state, storeList: action.payLoad };
  } else if (action.type === RESET_STORE_LIST) {
    return { ...state, storeList: null };
  } else if (action.type === SET_SPECIFIC_STORE) {
    return { ...state, specificStore: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_STORE) {
    return { ...state, specificStore: null };
  } else if (action.type === SET_SPECIFIC_KEEPER) {
    return { ...state, specificKeeper: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_KEEPER) {
    return { ...state, specificKeeper: null };
  } else if (action.type === SET_SPECIFIC_PACKAGE_ID) {
    return { ...state, specificPackageId: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_PACKAGE_ID) {
    return { ...state, specificPackageId: [] };
  } else if (action.type === SET_City_LIST) {
    return { ...state, cityList: action.payLoad };
  } else if (action.type === RESET_City_LIST) {
    return { ...state, cityList: null };
  } else if (action.type === SET_SPECIFIC_City) {
    return { ...state, specificCity: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_City) {
    return { ...state, specificCity: null };
  } else if (action.type === SET_NEIGHBORHOOD_LIST) {
    return { ...state, neighborhoodList: action.payLoad };
  } else if (action.type === RESET_NEIGHBORHOOD_LIST) {
    return { ...state, neighborhoodList: null };
  } else if (action.type === SET_SPECIFIC_NEIGHBORHOOD) {
    return { ...state, specificNeighborhood: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_NEIGHBORHOOD) {
    return { ...state, specificNeighborhood: null };
  } else if (action.type === SET_PROVINCE_LIST) {
    return { ...state, provinceList: action.payLoad };
  } else if (action.type === RESET_PROVINCE_LIST) {
    return { ...state, provinceList: null };
  } else if (action.type === SET_SPECIFIC_PROVINCE) {
    return { ...state, specificProvince: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_PROVINCE) {
    return { ...state, specificProvince: null };
  } else if (action.type === SET_ZONE_LIST) {
    return { ...state, zoneList: action.payLoad };
  } else if (action.type === RESET_ZONE_LIST) {
    return { ...state, zoneList: null };
  } else if (action.type === SET_SPECIFIC_ZONE) {
    return { ...state, specificZone: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_ZONE) {
    return { ...state, specificZone: null };
  } else if (action.type === SET_CLIENT_LIST) {
    return { ...state, clientList: action.payLoad };
  } else if (action.type === RESET_CLIENT_LIST) {
    return { ...state, clientList: null };
  } else if (action.type === SET_SPECIFIC_CLIENT) {
    return { ...state, specificClient: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_CLIENT) {
    return { ...state, specificClient: null };
  } else if (action.type === SET_COURIER_LIST) {
    return { ...state, courierList: action.payLoad };
  } else if (action.type === RESET_COURIER_LIST) {
    return { ...state, courierList: null };
  } else if (action.type === SET_AGREEMENT_LIST) {
    return { ...state, agreementList: action.payLoad };
  } else if (action.type === RESET_AGREEMENT_LIST) {
    return { ...state, agreementList: null };
  } else if (action.type === SET_CUSTOMERCARE_LIST) {
    return { ...state, customerCareList: action.payLoad };
  } else if (action.type === RESET_CUSTOMERCARE_LIST) {
    return { ...state, customerCareList: null };
  } else if (action.type === SET_CASHIER_LIST) {
    return { ...state, cashierList: action.payLoad };
  } else if (action.type === RESET_CASHIER_LIST) {
    return { ...state, cashierList: null };
  } else if (action.type === SET_ACCOUNTANT_LIST) {
    return { ...state, accountantList: action.payLoad };
  } else if (action.type === RESET_ACCOUNTANT_LIST) {
    return { ...state, accountantList: null };
  } else {
    return state;
  }
};

export default AdminReducer;
