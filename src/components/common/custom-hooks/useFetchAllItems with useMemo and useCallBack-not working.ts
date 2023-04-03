/**
 * useMemo and useCallBack added for optimization
In this code, fetchData function has been extracted and wrapped inside a useCallback hook. 
This hook memoizes the function, meaning it will return the same function reference unless 
one of the dependencies changes. The dependencies of useCallback are the same as the 
dependencies of the useEffect hook.

In addition, addAuthTokenToHeaders function has been wrapped inside a useMemo hook. 
This hook memoizes the result of the function, meaning it will return the same result 
unless one of the dependencies changes. In this case, the useMemo hook has no dependencies.

Finally, the useEffect hook has been modified to call the memoized fetchData function 
and return a cleanup function that cancels the Axios request.
 */

import { useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import { addAuthTokenToHeaders } from "../../auth/AuthService";

type Dispatch = (action: { type: string; payload?: any }) => void;

type Props = {
  requestDispatchType: string;
  successDispatchType: string;
  failureDispatchType: string;
  apiUrl: string;
  dispatch: Dispatch;
};

const useFetchAllItems = ({
  requestDispatchType,
  successDispatchType,
  failureDispatchType,
  apiUrl,
  dispatch,
}: Props) => {
  const fetchData = useCallback(() => {
    console.log("useCallback called in useFetchAllItems");

    const source = axios.CancelToken.source();

    const getData = async () => {
      dispatch({ type: requestDispatchType });

      try {
        const response = await axios.get(`${apiUrl}/api/products`, {
          headers: addAuthTokenToHeaders({}),
          cancelToken: source.token,
        });

        const result = response.data.data.data.map(
          (o: {
            id: string;
            title: string;
            description: string;
            price: number;
          }) => ({
            id: o.id,
            name: o.title,
            description: o.description,
            price: o.price,
          })
        );

        console.log("result in useFetchAllItems", result);

        dispatch({ type: successDispatchType, payload: result });
      } catch (error: any) {
        if (axios.isCancel(error)) {
          console.log("Request canceled");
        } else {
          dispatch({ type: failureDispatchType, payload: error.message });
        }
      }
    };

    getData();

    return () => {
      source.cancel("Operation canceled by the user.");
    };
  }, [
    successDispatchType,
    requestDispatchType,
    failureDispatchType,
    apiUrl,
    dispatch,
  ]);

  useEffect(() => {
    const fetchDataCallback = () => fetchData();
    fetchDataCallback();
    return () => {
      // Cleanup function
    };
  }, [fetchData]);
  

  const headers = useMemo(() => {
    return addAuthTokenToHeaders({});
  }, []);

  return headers;
};

export default useFetchAllItems;
