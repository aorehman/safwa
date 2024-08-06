import safwaAuth from "../../api/safwaAuth";
import safwaValidUser from "../../api/safwaValidUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_SUCCESS,
  LOGOUT,
  SET_LOADER,
  SET_TOKEN,
  SET_VALIDATE_ERROR,
  RESET_VALIDATE_ERROR,
} from "../Types/AuthTypes";

export const userRegister = (data, formik) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaAuth.post("/register", data);
      dispatch({ type: CLOSE_LOADER });
      console.log(response);
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
      localStorage.setItem(
        "safwaToken",
        JSON.stringify(response?.data?.data?.data)
      );
      dispatch({ type: SET_TOKEN });
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

export const userLogin = (data, formik) => {
  return async (dispatch) => {
    const { phone, password } = data;
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaAuth.post("/login", {
        phone,
        password,
        fcm: "klkakskdfkl",
      });
      dispatch({
        type: RESET_VALIDATE_ERROR,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
      localStorage.setItem(
        "safwaToken",
        JSON.stringify(response?.data?.data?.data)
      );
      dispatch({ type: SET_TOKEN });
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

export const logoutAll = (token) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/logout", {
        headers: { Authorization: token },
      });
      dispatch({ type: CLOSE_LOADER });
      localStorage.removeItem("safwaToken");
      dispatch({ type: LOGOUT });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
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

export const userLogout = (token) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/logoutCurrentDevice", {
        headers: { Authorization: token },
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: LOGOUT });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.message });
      return true
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

export const getUserData = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.get("/user");
      dispatch({ type: CLOSE_LOADER });
      var old = JSON.parse(localStorage.getItem("safwaToken"));
      old.profile_photo = response?.data?.data?.data?.profile_photo;
      localStorage.setItem("safwaToken", JSON.stringify(old));
      dispatch({ type: SET_TOKEN });
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

export const userChangePassword = (data) => {
  return async (dispatch) => {
    const { old_password, new_password } = data;
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("/updatePassword", {
        old_password,
        new_password,
      });
      dispatch({
        type: RESET_VALIDATE_ERROR,
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
          payLoad: err.response?.data?.errors,
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

export const fcm = (fcm, operation, message) => {
  return async (dispatch) => {
    // console.log(fcm);
    const headers = {
      Authorization:
        "key=AAAALOkXYCE:APA91bHu9OBjY9TEelH7MBL443B0zVB-4h6ZLLxOIBYpPGLpBscWVuMsEICDDqbLb-Xu5mWY1NpCOUU0cAl7-yCzQ7DVsdjVZ7Uid4ItOx4JFy9r7B7ElUhC9T0NYvyah7sUqz4JexmC",
      "Content-Type": "application/json",
    };

    const data = {
      registration_ids: [
        fcm,
        // "cJ2sjDeSTguthVRmk0X3i5:APA91bH8ABeN9sBjwcwv5LTowqjW397tfMsowtn2liQNLm-rsJA0Y0ZtnOLPq4ASqfxkntKP_oxv9BS5jiITw6Ouz0VQPUs0006xYXIR6dHa72AvztNK1vuD9QaTo7y65BPc0UAHWwud",
      ],
      notification: {
        body: message,
        title: operation + " Order",
        priority: "high",
        android_channel_id: "safwa_client",
        // "image" : "https://images.pexels.com/photos/2067057/pexels-photo-2067057.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      data: {
        // payload
        operation: operation, // "return" , "deliver" , "pickup"
      },
    };
  };
};

export const sendOtp = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/sendOtp", data);
      dispatch({
        type: RESET_VALIDATE_ERROR,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.OTP });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response?.data?.errors,
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

export const verifyOtp = ({ data, formik, userdata, navigate }) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/verifyOtp", data);
      dispatch({
        type: RESET_VALIDATE_ERROR,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.OTP });
      dispatch(userRegister(userdata, formik)).then((success) => {
        if (success) {
          navigate("/client/dashboard");
        }
      });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response?.data?.errors,
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

export const sendOtpForgot = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.post("/forgotPassword", data);
      dispatch({
        type: RESET_VALIDATE_ERROR,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.OTP });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response?.data?.errors,
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
export const ForgotPassword = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await safwaValidUser.put("/forgotPassword", data);
      dispatch({
        type: RESET_VALIDATE_ERROR,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SUCCESS, payLoad: response?.data?.data?.OTP });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      if (err?.response?.status === 422) {
        dispatch({
          type: SET_VALIDATE_ERROR,
          payLoad: err.response?.data?.errors,
        });
      } else if (err?.response?.status === 401) {
        localStorage.removeItem("safwaToken");
        dispatch({ type: LOGOUT });
      }
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.message,
      });
      return false;
    }
  };
};
