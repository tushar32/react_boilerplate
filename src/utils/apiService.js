import { request } from "./request";

let apiEndPoint =
  "https://api-intertrain.adcreatorsdemo.com.au/frontend/web/index.php?r=";

let subdomain = localStorage.subdomain;
let headers = {
  Accept: "application/json",
  "Content-Type": "application/x-www-form-urlencoded",
};

if (localStorage.access_token) {
  headers = {
    ...headers,
    Authorization: "Bearer " + localStorage.access_token,
  };
}

/*
  method post
*/

export function post(url, params) {
  return request(
    apiEndPoint + url + "&subdomain=" + subdomain,
    "POST",
    headers,
    params,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function get(url, params) {
  return request(
    apiEndPoint + url + "&subdomain=" + subdomain,
    "GET",
    headers,
    params,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export function fetchStudents(url, params) {
  return request(
    apiEndPoint + url + "&subdomain=" + subdomain,
    "GET",
    headers,
    params,
    false
  )
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

const apiService = {
  post,
  get,
  fetchStudents,
};

export default apiService;
