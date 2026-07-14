import {
  SET_CURRENT_USER,
  CLEAR_CURRENT_USER,
  SET_AUTH_HYDRATED,
} from "../types/authTypes";

const initialState = {
  user: null,
  isHydrated: false,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case CLEAR_CURRENT_USER:
      return { ...state, user: null };
    case SET_AUTH_HYDRATED:
      return { ...state, isHydrated: action.payload };
    default:
      return state;
  }
}
