/*
   Author: Tushar Barate
   Date: 08-06-2020
   Description: A custom hook to delay the API calling to limit the server hits
*/
import React,{useEffect} from "./node_modules/react";

const useDebounce = (value, delay) => {
    
  const [debouncedValue, setDebouncedValue] = React.useState(value);

    useEffect(() => {
       
        const handler = setTimeout(() => {            
            setDebouncedValue(value);
        }, delay);

        return () => {
          // componentwillunmount
            clearTimeout(handler);
        };
    }, [value, delay]); // updates anytime value or delay changes

  return debouncedValue;
};


export default useDebounce;