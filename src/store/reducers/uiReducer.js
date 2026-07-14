import {
  TOGGLE_SIDEBAR,
  SET_SIDEBAR_STATE,
  TOGGLE_SIDEBAR_COLLAPSE,
  SET_SIDEBAR_COLLAPSED,
} from "../types/uiTypes";

const initialState = {
  sidebarOpen: true,
  sidebarCollapsed: false,
};

export function uiReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case SET_SIDEBAR_STATE:
      return { ...state, sidebarOpen: action.payload };
    case TOGGLE_SIDEBAR_COLLAPSE:
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed };
    case SET_SIDEBAR_COLLAPSED:
      return { ...state, sidebarCollapsed: action.payload };
    default:
      return state;
  }
}
