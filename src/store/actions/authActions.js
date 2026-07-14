import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_AUTH_HYDRATED,
} from "../types/authTypes";

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER,
});

export const setAuthHydrated = (isHydrated) => ({
  type: SET_AUTH_HYDRATED,
  payload: isHydrated,
});
