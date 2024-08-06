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
  RESET_KEEPER_ORDERS,
  RESET_KEEPER_ORDERS_DELIVER,
  RESET_KEEPER_ORDERS_RETURN,
  RESET_KEEPER_PICKUP_ORDERS,
  SET_COURIERS,
  SET_KEEPER_COURIER_DELIVER,
  SET_KEEPER_ORDERS,
  SET_KEEPER_ORDERS_DELIVER,
  SET_KEEPER_ORDERS_DESTINATION,
  SET_KEEPER_ORDERS_ORIGIN,
  SET_KEEPER_ORDERS_RECEIVE,
  SET_KEEPER_ORDERS_RETURN,
  SET_KEEPER_PICKUP_ORDERS,
  SET_KEEPER_RECEIVE_BOUND,
  SET_KEEPER_STORE_ORDERS,
  SET_RTW_ORDERS,
} from "../Types/KeeperTypes";
import { SET_ORDER_BY_STATUS } from "../Types/ShipmentTypes";

function mergeDataWithoutDuplicates(arr1, arr2) {
  const merged = [...arr1];
  arr2.forEach((item) => {
    if (!merged.find((existingItem) => existingItem._id === item._id)) {
      merged.push(item);
    }
  });
  return merged;
}

export const getCouriers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/storeCouriers");
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_COURIERS, payLoad: response.data.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
    }
  };
};

export const getkeeperOrders = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/ordersForPickup", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_KEEPER_ORDERS, payLoad: response.data.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: RESET_KEEPER_ORDERS });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      } else if (err?.response?.status === 500) {
        console.log(err.response);
        dispatch({
          type: RESET_KEEPER_ORDERS,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperPickupOrders = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post(
        "/operation/assignCourier/forPickup",
        {
          courier_id: formData.courier_id,
          order_codes: formData.order_codes,
        }
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message }); // Dispatch success action

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperOrdersReceive = (selectedInput) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/OrdersReceiveInBound", {
        order_code: selectedInput,
      });
      dispatch({ type: CLOSE_LOADER });
      const newData = response.data.data;

      const previousData = state?.KeeperReducer?.keeperOrdersReceive || [];
      const mergedData = mergeDataWithoutDuplicates(previousData, newData);
      dispatch({ type: SET_KEEPER_ORDERS_RECEIVE, payLoad: mergedData });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperReceiveBound = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/operation/receiveInBound", {
        courier_id: formData.courier_id,
        order_codes: formData.order_codes,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message }); // Dispatch success action

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperOrdersDeliver = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/ordersForDeliver", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_KEEPER_ORDERS_DELIVER,
        payLoad: response.data.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_KEEPER_ORDERS_DELIVER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      } else if (err?.response?.status === 500) {
        console.log(err.response);
        dispatch({
          type: RESET_KEEPER_ORDERS_DELIVER,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperCourierDeliver = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post(
        "/operation/assignCourier/forDeliver",
        {
          courier_id: formData.courier_id,
          order_codes: formData.order_codes,
        }
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message }); // Dispatch success action
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperOrdersReturn = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/ordersForReturn", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_KEEPER_ORDERS_RETURN,
        payLoad: response.data.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_KEEPER_ORDERS_RETURN });
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
    }
  };
};

export const getkeeperCourierReturn = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post(
        "/operation/assignCourier/forReturn",
        {
          courier_id: formData.courier_id,
          order_codes: formData.order_codes,
        }
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message }); // Dispatch success action
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperOrdersStore = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/storeOrders", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_KEEPER_STORE_ORDERS,
        payLoad: response.data.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getKeeperOrdersByStatus = (status, page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });

    try {
      const response = await safwaValidUser.post("/ordersByStatus", {
        status,
        page,
        per_page,
      });

      dispatch({ type: CLOSE_LOADER });

      dispatch({
        type: SET_ORDER_BY_STATUS,
        payLoad: response?.data?.data,
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

export const getkeeperWayBill = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post(
        "/getWaybill",
        {
          order_codes: formData.order_codes,
        },
        {
          responseType: "blob",
        }
      );
      dispatch({ type: CLOSE_LOADER });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "wayBill.pdf");
      document.body.appendChild(link);
      link.click();
      return response;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperDestination = (selectedInput) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/OrdersForDestination", {
        order_code: selectedInput,
      });
      dispatch({ type: CLOSE_LOADER });
      const newData = response.data.data;

      const previousData = state?.KeeperReducer?.keeperOrdersDestination || [];
      const mergedData = mergeDataWithoutDuplicates(previousData, newData);
      dispatch({ type: SET_KEEPER_ORDERS_DESTINATION, payLoad: mergedData });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperTransitDestination = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post(
        "/operation/transitToDestination",
        {
          store_id: formData.store_id,
          order_codes: formData.order_codes,
        }
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message }); // Dispatch success action
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getkeeperOrigin = (selectedInput) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/OrdersForOrigin", {
        order_code: selectedInput,
      });
      dispatch({ type: CLOSE_LOADER });
      const newData = response.data.data;

      const previousData = state?.KeeperReducer?.keeperOrdersOrigin || [];
      const mergedData = mergeDataWithoutDuplicat(previousData, newData);
      dispatch({ type: SET_KEEPER_ORDERS_ORIGIN, payLoad: mergedData });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

function mergeDataWithoutDuplicat(arr1, arr2) {
  const merged = [...arr1];
  arr2.forEach((item) => {
    if (!merged.find((existingItem) => existingItem._id === item._id)) {
      merged.push(item);
    }
  });
  return merged;
}

export const getkeeperTransitOrigin = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });

    try {
      const response = await safwaValidUser.post("/operation/transitToOrigin", {
        courier_id: formData.courier_id,
        order_codes: formData.order_codes,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message }); // Dispatch success action
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

// return to warehouse

export const getRTWOrder = (selectedInput) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/OrdersReturnToWarehouse", {
        order_code: selectedInput,
      });
      dispatch({ type: CLOSE_LOADER });
      const newData = response.data.data;

      const previousData = state?.KeeperReducer?.rtwOrders || [];
      const mergedData = mergeDataWithoutDuplicates(previousData, newData);
      dispatch({ type: SET_RTW_ORDERS, payLoad: mergedData });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const receiveRTWOrders = (orders) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post(
        "/operation/returnToWarehouse",
        {
          order_codes: orders,
        }
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message }); // Dispatch success action

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response.data?.errors,
        });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};
