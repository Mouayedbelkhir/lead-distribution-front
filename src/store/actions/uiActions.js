import {
  TOGGLE_SIDEBAR,
  SET_SIDEBAR_STATE,
  TOGGLE_SIDEBAR_COLLAPSE,
  SET_SIDEBAR_COLLAPSED,
} from "../types/uiTypes";

export const toggleSidebar = () => ({
  type: TOGGLE_SIDEBAR,
});

export const setSidebarState = (isOpen) => ({
  type: SET_SIDEBAR_STATE,
  payload: isOpen,
});

export const toggleSidebarCollapse = () => ({
  type: TOGGLE_SIDEBAR_COLLAPSE,
});

export const setSidebarCollapsed = (collapsed) => ({
  type: SET_SIDEBAR_COLLAPSED,
  payload: collapsed,
});
