import { useEffect } from "react";
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
  useEffect(() => {
    console.log("useEffect called in useFetchAllItems");

    const source = axios.CancelToken.source();

    const fetchData = async () => {
      dispatch({ type: requestDispatchType });

      try {
        const response = await axios.get(`${apiUrl}/items`, {
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

    fetchData();

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
};

export default useFetchAllItems;
