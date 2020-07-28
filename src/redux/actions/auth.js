import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  AUTH_FAILED,
  AUTH_REQUEST,
  LOGOUT,
  SET_ALERT,
} from "./../types";
import axios from "axios";
import { getValue } from "../../utils/app";
import apiService from "../../utils/apiService";

export const loadUser = () => async (dispatch) => {
  //({ type: LOGOUT });

  const portal =
    localStorage.portal === undefined ? "companyportal" : localStorage.portal;

  apiService
    .get("api/" + portal + "/userdetail", { subdomain: localStorage.subdomain })
    .then(
      (response) => {
        /*
        A user detail will get saved in reducer
      */
        dispatch({
          type: USER_LOADED,
          payload: response.data.result,
        });
      },
      (error) => {
        const status = getValue(error, "error.response.status");
        const errorCode = getValue(error, "error.response.data.error");

        // dispatch({
        //   type: SET_ALERT,
        //   payload: error,
        // });
      }
    );
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/auth/register", body, options);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      dispatch({
        type: SET_ALERT,
        payload: errors,
      });
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (formData) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });

  apiService.post("api/company/loginuser", formData).then(
    (response) => {
      /*
        A user token will get stored in reducer
      */
      const { type } = formData;
      let portal = "";
      let prefix = "";
      switch (type) {
        case "1":
          portal = "student";
          prefix = "/student";
          break;
        case "2":
          portal = "assessorportal";
          prefix = "/assessor";
          break;
        case "3":
          portal = "companyportal";
          prefix = "/company";
          break;
        default:
          portal = "companyportal";
          prefix = "/company";
      }

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          access_token: response.data.values.access_token,
          subdomain: response.data.values.subdomain,
          portal: portal,
          prefix: prefix,
        },
      });

      /*
        A user detail will get saved in reducer
      */
      dispatch({
        type: USER_LOADED,
        payload: response.data.values,
      });
    },
    (error) => {
      const status = getValue(error, "error.response.status");
      const errorCode = getValue(error, "error.response.data.error");
      const errorDescription = getValue(
        error,
        "error.response.data.error_description"
      );
      if (status === 404) {
        // dispatch(
        //   setUserLoggedIn({
        //     invalidLogin: true,
        //     errorDescription: errorDescription,
        //   })
        // );
        // return;
      }
      dispatch({
        type: AUTH_FAILED,
      });
      dispatch({
        type: SET_ALERT,
        payload: { general: { msg: errorCode } },
      });
    }
  );
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  // dispatch({ type: CLEAR_PROFILE });
};
