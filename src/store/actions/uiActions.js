import { TOGGLE_SIDEBAR, SET_SIDEBAR_STATE } from "../types/uiTypes";

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const setSidebarState = (isOpen) => ({
  type: SET_SIDEBAR_STATE,
  payload: isOpen,
});
