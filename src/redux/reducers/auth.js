import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_FAILED,
  LOGIN_SUCCESS,
  AUTH_REQUEST,
  LOGOUT,
} from "../types";

const initialState = {
  access_token: localStorage.getItem("access_token"),
  isAuth: null,
  loading: false,
  user: null,
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuth: true,
        loading: false,
      };

    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("access_token", payload.access_token);
      localStorage.setItem("portal", payload.portal);
      localStorage.setItem("prefix", payload.prefix);
      localStorage.setItem("subdomain", payload.subdomain);

      return {
        ...state,
        ...payload,
        isAuth: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_FAILED:
    case LOGOUT:
      localStorage.removeItem("access_token");
      localStorage.removeItem("portal");
      localStorage.removeItem("prefix");
      localStorage.removeItem("subdomain");
      return {
        ...state,
        access_token: null,
        isAuth: false,
        loading: false,
      };

    default:
      return state;
  }
}
