/*
   Author : Tushar Barate
   Date: 08-06-2020
   Description: A custom hook to call API asyncronously with error handling support
*/
import { useState, useEffect } from "react";
import axios from "axios";

import setAuthToken from "../../utils/setAuthToken";

import useDebounce from "./useDebounce";

let apiEndPoint =
  "https://api-intertrain.adcreatorsdemo.com.au/frontend/web/index.php?r=";
let subdomain = localStorage.subdomain;
const useDataApi = (initialUrl, param, searchText, fetchId = 0) => {
  const [data, setData] = useState(param);
  const [fetchUrl, setFetchUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // useEffect(() => {
  if (localStorage.access_token) {
    //setAuthToken will set the token in the header to send to /api/*
    // It's helper function
    setAuthToken(localStorage.access_token);
  }

  // to delay the response
  const debouncedValue = useDebounce(searchText, 500);

  useEffect(() => {
    console.log("call hook");

    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.post(
          apiEndPoint + initialUrl + searchText + "&subdomain=" + subdomain,
          param
        );

        console.log(result);
        setData(result.data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }

      setIsLoading(false);
    };

    fetchData();

    // Passed a param debouncedValue which means that whenver there is a change in a
    // search term this component will re render and API will get called
  }, [debouncedValue, fetchUrl, fetchId]);

  return [data, isLoading, isError];
};

export default useDataApi;
