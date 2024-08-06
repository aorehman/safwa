import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import AuthReducer from "./Reducers/AuthReducer";
import GetDataReducer from "./Reducers/GetDataReducer";
import ShipmentReducer from "./Reducers/ShipmentReducer";
import KeeperReducer from "./Reducers/KeeperReducer";
import DashboardReducer from "./Reducers/DashboardReducer";
import AdminReducer from "./Reducers/AdminReducer";

const rootReducers = combineReducers({
  AuthReducer,
  GetDataReducer,
  ShipmentReducer,
  KeeperReducer,
  DashboardReducer,
  AdminReducer,
});

const middlewares = [thunk];

const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;
