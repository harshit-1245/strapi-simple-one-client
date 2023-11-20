import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (endpoint) => {
  const [data, setData] = useState();

  useEffect(() => {
    let isMounted = true; // A flag to track if the component is still mounted

    const makeApiCall = async () => {
      const res = await fetchDataFromApi(endpoint);
      
      if (isMounted) {
        // Check if the component is still mounted before updating the state
        setData(res);
      }
    };

    makeApiCall();

    // Cleanup function
    return () => {
      isMounted = false; // Mark the component as unmounted
    };
  }, [endpoint]);

  return { data };
};

export default useFetch;
