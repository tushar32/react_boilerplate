// import * as storage from "../storage";

/*
   Author : Parth Bhardva
   Date: 25-05-2020
   Description: A request API for Axios calling
*/
import { getSessionStorage } from "../storage";
import { getValue } from "./app";
// import * as signInAction from "../containers/Login/actions";
import { logout } from "../redux/actions/auth";
// Will be using AXIOS library for making calls to API from react...
// Documentation for:: https://www.npmjs.com/package/axios
import axios from "axios";

function getSignedInUserHeader(header) {
  const user = getSessionStorage("user");
  const token = user && JSON.parse(user) && JSON.parse(user).accessToken;
  if (!token) {
    logout(); //TODO find better option for logout
    return;
  }
  if (!header) {
    header = {};
  }
  header.Authorization = "Bearer " + token;
  return header;
}

/**
 * [request description]
 * @param  {[string]} url       URL of the API which needs to be consumed by client
 * @param  {[string]} method    Method type of the API call currently GET,POST,PUT,DELETE is supported in order suport to more methods add method name to the array -> allowedMethodTypes
 * @param  {[JSON]} payload     Payload to be provided to server for sending data
 * @param  {[string]} headers   Request Headers required by the server side to process the API call
 * @return {[JSON]}             Response provided by the server side code
 */
export const request = (
  url,
  method,
  headers,
  payload,
  isLoginRequire = true,
  option
) => {
  // var str = `Hello, ${name}!`;

  return new Promise((resolve, reject) => {
    // Check for allowed method types for making a REST API call if not valid then throw an error...
    const allowedMethodTypes = ["get", "post", "put", "delete", "patch"];
    if (allowedMethodTypes.indexOf(method.toLowerCase()) < 0) {
      throw new Error(
        `Invalid method type please provide one of these methods... \n ${allowedMethodTypes}`
      );
    } else {
      let signedHeader = headers;
      if (isLoginRequire) signedHeader = getSignedInUserHeader(headers);
      let options = { method, url, headers: signedHeader, ...option };
      if (method.toLowerCase() === "get") {
        options.params = payload;
      } else {
        options.data = payload;
      }

      axios(options)
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          // if (
          //   getValue(error, "error.response.status") === 401 &&
          //   getValue(error, "error.response.data.error") === "invalid_token"
          // ) {
          //   const isRefreshTokenFail =
          //     (getValue(error, "error.response.config.url") || "").indexOf(
          //       "/refresh"
          //     ) > -1;
          //   if (isRefreshTokenFail) {
          //     logout();
          //     return;
          //   }
          //   const refresh_token = JSON.parse(getSessionStorage("user") || "{}")
          //     .refreshToken;
          //   refreshToken({ refresh_token })
          //     .then((res) => {
          //       signInAction.setUserLoggedIn(res); // TODO find better option for logged in as we are calling action directly from here
          //       options.headers = getSignedInUserHeader(headers);
          //       axios(options)
          //         .then((response) => {
          //           resolve(response);
          //         })
          //         .catch((err) => {
          //           // reject(err);
          //           logout(); //TODO find better option for logout
          //         });
          //     })
          //     .catch((err) => {
          //       // reject(err);
          //       logout(); //TODO find better option for logout
          //     });
          // } else {
          reject(error);
          // }
        });
    }
  });
};
