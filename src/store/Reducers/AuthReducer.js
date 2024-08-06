import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_SUCCESS,
  LOGOUT,
  RESET_ERROR,
  RESET_SUCCESS,
  SET_LOADER,
  SET_VALIDATE_ERROR,
  RESET_VALIDATE_ERROR,
  SET_TOKEN,
} from "../Types/AuthTypes";

const initialState = {
  loading: false,
  user: [],
  token: "",
  validateErrors: null,
  success: "",
  error: "",
};

const token = localStorage.getItem("safwaToken");
if (token) {
  initialState.token = token;
  initialState.user = JSON.parse(token);
}

const AuthReducer = (state = initialState, action) => {
  if (action.type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (action.type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (action.type === SET_VALIDATE_ERROR) {
    return { ...state, validateErrors: action.payLoad };
  } else if (action.type === RESET_VALIDATE_ERROR) {
    return { ...state, validateErrors: null };
  } else if (action.type === SET_SUCCESS) {
    return { ...state, success: action.payLoad };
  } else if (action.type === RESET_SUCCESS) {
    return { ...state, success: "" };
  } else if (action.type === SET_ERROR) {
    return { ...state, error: action.payLoad };
  } else if (action.type === RESET_ERROR) {
    return { ...state, error: "" };
  } else if (action.type === LOGOUT) {
    return { ...state, token: "", user: [] };
  } else if (action.type === SET_TOKEN) {
    const token = localStorage.getItem("safwaToken");
    return { ...state, user: JSON.parse(token), token: token };
  } else {
    return state;
  }
};

export default AuthReducer;
