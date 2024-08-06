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

const initialState = {
  stats: [],
  statsByMonths: [],
};

const DashboardReducer = (state = initialState, action) => {
  if (action.type === SET_STATS) {
    return { ...state, stats: action.payLoad };
  } else if (action.type === RESET_STATS) {
    return { ...state, stats: [] };
  } else if (action.type === SET_STATS_BY_MONTHS) {
    return { ...state, statsByMonths: action.payLoad };
  } else if (action.type === RESET_STATS_BY_MONTHS) {
    return { ...state, statsByMonths: [] };
  } else {
    return state;
  }
};

export default DashboardReducer;
