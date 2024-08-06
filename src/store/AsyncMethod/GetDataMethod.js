import safwaAuth from "../../api/safwaAuth";
import safwaValidUser from "../../api/safwaValidUser";
import { CLOSE_LOADER, SET_LOADER } from "../Types/AuthTypes";
import {
  SET_CITIES,
  SET_NEIGHBORHOODS,
  SET_ZONES,
  SET_USER_ADDRESSES,
  SET_PACKAGE_TYPES,
  SET_STORE,
  SET_PROVINCE,
  SET_B_CLIENT,
} from "../Types/GetDataTypes";

export const getCities = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaAuth.get("/cities");
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_CITIES, payLoad: response?.data?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};

export const getZonessById = (cityId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaAuth.get(`/zones/${cityId}`);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_ZONES, payLoad: response?.data?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};

export const getNeighborhoodsById = (zoneId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaAuth.get(`/neighborhoods/${zoneId}`);

      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_NEIGHBORHOODS,
        payLoad: response?.data?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};

export const getUserAddresses = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.get("/userAddresses");
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_USER_ADDRESSES,
        payLoad: response?.data?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};

export const getPackageTypes = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.get("/packageTypes");
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PACKAGE_TYPES,
        payLoad: response?.data?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};

export const getSampleFile = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.get("/downloadESample");

      dispatch({ type: CLOSE_LOADER });
      const url = response.data.data;
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "sample.xlsx");
      document.body.appendChild(link);
      link.click();
      return response;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
    }
  };
};

export const getStores = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/getStoresList");
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_STORE,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};

export const getProvinces = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaAuth.get("/provinces");
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_PROVINCE, payLoad: response?.data?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};
export const getBClients = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/getBClientList");
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_B_CLIENT, payLoad: response?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};
