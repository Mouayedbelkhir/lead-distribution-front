import { TOGGLE_SIDEBAR, SET_SIDEBAR_STATE } from "../types/uiTypes";

const initialState = {
  sidebarOpen: true,
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case SET_SIDEBAR_STATE:
      return { ...state, sidebarOpen: action.payload };
    default:
      return state;
  }
}
