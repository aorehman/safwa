import safwaValidUser from "../../api/safwaValidUser";

import {
  CLOSE_LOADER,
  LOGOUT,
  SET_ERROR,
  SET_LOADER,
  SET_VALIDATE_ERROR,
} from "../Types/AuthTypes";
import {
  RESET_KEEPER_STATS,
  RESET_KEEPER_STATS_BY_MONTHS,
  RESET_STATS,
  RESET_STATS_BY_MONTHS,
  SET_KEEPER_STATS,
  SET_KEEPER_STATS_BY_MONTHS,
  SET_STATS,
  SET_STATS_BY_MONTHS,
} from "../Types/DashboardTypes";

export const getStats = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/order/getStats");

      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_STATS, payLoad: response?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_STATS });
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
        payLoad: err.response?.data?.error?.error,
      });
      return false;
    }
  };
};

export const getStatsByMonths = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/order/getStatsByMonths");

      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_STATS_BY_MONTHS,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_STATS_BY_MONTHS });
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
        payLoad: err.response?.data?.error?.error,
      });
      return false;
    }
  };
};

export const getKeeperStats = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/getStats");

      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_STATS, payLoad: response?.data?.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_KEEPER_STATS });
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
        payLoad: err.response?.data?.error?.error,
      });
      return false;
    }
  };
};

export const getKeeperStatsByMonths = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/getStatsByMonths");

      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_STATS_BY_MONTHS,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_KEEPER_STATS_BY_MONTHS });
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
        payLoad: err.response?.data?.error?.error,
      });
      return false;
    }
  };
};
