import { type } from "@testing-library/user-event/dist/type";
import safwaValidUserForFile from "../../api/SafwaValidUserForFile";
import safwaValidUser from "../../api/safwaValidUser";
import {
  CLOSE_LOADER,
  LOGOUT,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
  SET_VALIDATE_ERROR,
} from "../Types/AuthTypes";
import {
  SET_ALL_ORDER,
  SET_TRACK_ORDER,
  SET_ORDER_BY_STATUS,
  RESET_ALL_ORDER,
  RESET_ORDER_STATUS,
} from "../Types/ShipmentTypes";

export const addUserAddress = (data, formik) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/address", data);
      dispatch({ type: CLOSE_LOADER });
      console.log(response);
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });

      formik.resetForm();
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err?.response?.data?.errors,
        });
      } else if (err?.response?.status === 401) {
        localStorage.removeItem("safwaToken");
        dispatch({ type: LOGOUT });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err?.response?.data?.error?.error,
      });
      return false;
    }
  };
};

export const createOrder = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/order", data);
      dispatch({ type: CLOSE_LOADER });
      console.log(response?.data?.data?.message);
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err?.response?.data?.errors,
        });
      } else if (err?.response?.status === 401) {
        localStorage.removeItem("safwaToken");
        dispatch({ type: LOGOUT });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err?.response?.data?.error?.error,
      });
      return false;
    }
  };
};

export const getAllOrders = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/order/myOrders", {
        page,
        per_page,
      });

      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_ALL_ORDER, payLoad: response?.data?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err?.response?.data?.errors,
        });
      } else if (err?.response?.status === 401) {
        localStorage.removeItem("safwaToken");
        dispatch({ type: LOGOUT });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err?.response?.data?.error?.error,
      });
      return false;
    }
  };
};

export const getTrackOrder = (trackingCode) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/trackOrder", {
        tracking_code: parseInt(trackingCode),
      });

      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_TRACK_ORDER, payLoad: response?.data?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err?.response?.data?.errors,
        });
      } else if (err?.response?.status === 401) {
        localStorage.removeItem("safwaToken");
        dispatch({ type: LOGOUT });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err?.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const importShipment = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUserForFile.post(
        "/order/importExcel",
        formData
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err?.response?.data?.errors,
        });
      } else if (err?.response?.status === 401) {
        localStorage.removeItem("safwaToken");
        dispatch({ type: LOGOUT });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err?.response?.data?.error?.error,
      });
      return false;
    }
  };
};

export const getOrdersByStatus = (status, page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });

    try {
      const response = await safwaValidUser.post("/order/byStatus", {
        status,
        page,
        per_page,
      });

      dispatch({ type: CLOSE_LOADER });
      console.log("tt", response?.data?.data?.data);

      dispatch({
        type: SET_ORDER_BY_STATUS,
        payLoad: response?.data?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err?.response?.data?.errors,
        });
      } else if (err?.response?.status === 401) {
        localStorage.removeItem("safwaToken");
        dispatch({ type: LOGOUT });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err?.response?.data?.error?.error,
      });
      return false;
    }
  };
};
