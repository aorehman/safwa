import safwaValidUserForFile from "../../api/SafwaValidUserForFile";
import safwaValidUser from "../../api/safwaValidUser";

import {
  CLOSE_LOADER,
  LOGOUT,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
  SET_TOKEN,
  SET_VALIDATE_ERROR,
} from "../Types/AuthTypes";

export const editUserProfile = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUserForFile.post(
        "/profile/change_photo",
        formData
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
      localStorage.setItem(
        "safwaToken",
        JSON.stringify(response?.data?.data?.data)
      );
      dispatch({ type: SET_TOKEN });
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

export const editUserPersonalData = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("/updateUser", data);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
      localStorage.setItem(
        "safwaToken",
        JSON.stringify(response?.data?.data?.data)
      );
      dispatch({ type: SET_TOKEN });
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

export const deleteAddress = (addressId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.delete(`/address/${addressId}`);
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
