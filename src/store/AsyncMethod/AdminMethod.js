import safwaValidUserForFile from "../../api/SafwaValidUserForFile";
import safwaValidUser from "../../api/safwaValidUser";
import {
  SET_COLLECTION_CHARGES,
  SET_KEPPER_LIST,
  SET_PACKAGE_TYPES,
  SET_SEARCH_OTP,
  SET_SPECIFIC_KEEPER,
  SET_SPECIFIC_STORE,
  SET_STORE_LIST,
  SET_SPECIFIC_PACKAGE_ID,
  SET_PROVINCE_LIST,
  SET_SPECIFIC_PROVINCE,
  SET_ZONE_LIST,
  SET_SPECIFIC_ZONE,
  SET_SPECIFIC_City,
  SET_City_LIST,
  SET_NEIGHBORHOOD_LIST,
  SET_SPECIFIC_NEIGHBORHOOD,
  SET_SPECIFIC_CLIENT,
  SET_CLIENT_LIST,
  SET_COURIER_LIST,
  SET_AGREEMENT_LIST,
  SET_CUSTOMERCARE_LIST,
  SET_CASHIER_LIST,
  SET_ACCOUNTANT_LIST,
} from "../Types/AdminTypes";
import {
  CLOSE_LOADER,
  LOGOUT,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
  SET_VALIDATE_ERROR,
} from "../Types/AuthTypes";

export const getKeeperList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("keeper/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_KEPPER_LIST,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const getCollectionCharges = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("charges/list");
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_COLLECTION_CHARGES,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const editCollectionCharge = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("charges/update", data);
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

export const deleteCollectionCharges = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("charges/delete", {
        charges_ids: data,
      });
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

// PackageType
export const getPackageTypes = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("packageType/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PACKAGE_TYPES,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      // console.log(err.response);
      return false;
    }
  };
};

export const createPackageTypes = (formData) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post(
        "packageType/create",
        formData
      );
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SUCCESS,
        payLoad: response?.data?.data?.message,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      // console.log(err.response);
      return false;
    }
  };
};

export const getPackageTypeById = (packageId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("packageType/getById", {
        package_id: packageId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_PACKAGE_ID,
        payLoad: response?.data?.data,
      });
      // dispatch({ type: SET_SPECIFIC_PACKAGE_ID, payLoad: response?.data?.data?.message });
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

export const editPackageType = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("packageType/update", data);
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

export const deletePackageType = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("packageType/delete", {
        package_ids: data,
      });
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

export const getSearchOtp = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("findOtp", data);
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SEARCH_OTP, payLoad: response?.data?.data?.otp });
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
        payLoad: err?.response?.data?.error?.message,
      });
      return false;
    }
  };
};

export const getStoreList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("store/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_STORE_LIST,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addStore = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("store/create", data);
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

export const getSpecificStoreById = (storeId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("store/getById", {
        store_id: storeId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_STORE,
        payLoad: response?.data?.data,
      });
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

export const editStore = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("store/update", data);
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

export const deleteStore = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("store/delete", {
        store_ids: data,
      });
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

export const addKeeper = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("keeper/create", data);
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

export const getSpecificKeeperById = (keeperId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("keeper/getById", {
        id: keeperId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_KEEPER,
        payLoad: response?.data?.data,
      });
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

export const editKeeper = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("keeper/updateById", data);
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

export const deleteKeeper = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("keeper/delete", {
        keeper_ids: data,
      });
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

// Province
export const getProvinceList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("province/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_PROVINCE_LIST,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addProvince = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("province/create", data);
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

export const getSpecificProvinceById = (provinceId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("province/getById", {
        province_id: provinceId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_PROVINCE,
        payLoad: response?.data?.data,
      });
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

export const editProvince = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("province/update", data);
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

export const deleteProvince = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("province/delete", {
        province_ids: data,
      });
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

//Zone
export const getZoneList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("zone/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_ZONE_LIST,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addZone = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("zone/create", data);
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

export const getSpecificZoneById = (zoneId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("zone/getById", {
        zone_id: zoneId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_ZONE,
        payLoad: response?.data?.data,
      });
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

export const editZone = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("zone/update", data);
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

export const deleteZone = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("zone/delete", {
        zone_ids: data,
      });
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

export const getCityList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("city/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_City_LIST,
        payLoad: response?.data?.data,
      });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addCity = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("city/create", data);
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

export const getSpecificCityById = (cityId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("city/getById", {
        city_id: cityId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_City,
        payLoad: response?.data?.data,
      });
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

export const editCity = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("city/update", data);
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

export const deleteCities = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("city/delete", {
        city_ids: data,
      });
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

export const getNeighborhoodList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("neighborhood/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_NEIGHBORHOOD_LIST,
        payLoad: response?.data?.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addNeighborhood = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("neighborhood/create", data);
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

export const getSpecificNeighborhoodById = (neighborhoodId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("neighborhood/getById", {
        neighborhood_id: neighborhoodId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_NEIGHBORHOOD,
        payLoad: response?.data?.data,
      });
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

export const editNeighborhood = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("neighborhood/update", data);
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

export const deleteNeighborhood = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("neighborhood/delete", {
        neighborhood_ids: data,
      });
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

//Client
export const addClient = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("client/create", data);
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

export const getSpecificClientById = (clientId) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("client/getById", {
        client_id: clientId,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_SPECIFIC_CLIENT,
        payLoad: response?.data?.data,
      });
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

export const editClient = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("client/update", data);
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

export const deleteClient = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("client/delete", {
        client_ids: data,
      });
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

export const getClientList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("client/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_CLIENT_LIST,
        payLoad: response?.data?.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addCourier = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("courier/create", data);
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

export const editCourier = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("courier/update", data);
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

export const getCourierList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("courier/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_COURIER_LIST,
        payLoad: response?.data?.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const deleteCourier = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("courier/delete", {
        courier_ids: data,
      });
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

export const getBClientAgreements = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("agreement/list", {
        per_page,
        page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_AGREEMENT_LIST,
        payLoad: response?.data?.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addAgreement = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("agreement/create", data);
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

export const editAgreement = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("agreement/update", data);
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

export const deleteBClientAgreement = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("agreement/delete", {
        agreement_ids: data,
      });
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

export const addCustomerCare = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("care/create", data);
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
export const editCustomerCare = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("care/update", data);
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
export const getCareList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("care/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_CUSTOMERCARE_LIST,
        payLoad: response?.data?.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const deleteCustomerCare = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("care/delete", {
        customer_care_ids: data,
      });
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

export const getCashierList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("cashier/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_CASHIER_LIST,
        payLoad: response?.data?.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addCashier = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("cashier/create", data);
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

export const editCashier = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("cashier/update", data);
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

export const deleteCashier = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("cashier/delete", {
        cashier_ids: data,
      });
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

export const getAccountantList = (page, per_page) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("accountant/list", {
        page,
        per_page,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({
        type: SET_ACCOUNTANT_LIST,
        payLoad: response?.data?.data,
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err.response);
      return false;
    }
  };
};

export const addAccountant = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("accountant/create", data);
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

export const editAccountant = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("accountant/update", data);
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

export const deleteAccountant = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("accountant/delete", {
        accountant_ids: data,
      });
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
