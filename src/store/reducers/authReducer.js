import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from "../types/authTypes";

const initialState = {
  user: null,
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { ...state, user: action.payload };
    case CLEAR_CURRENT_USER:
      return { ...state, user: null };
    default:
      return state;
  }
}
