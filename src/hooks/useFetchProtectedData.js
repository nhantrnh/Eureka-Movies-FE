import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axios";
import { notification } from "antd";
import { useAuthStore } from "./useAuthStore";
// Function: wrapPromise
// Parameters: promise - a promise object
// Returns: throw promise if status is pending, throw result if status is error, return result if status is success -> so that Suspense, ErrorBoundary
// can catch the promise or error or return the result
const wrapPromise = (promise, setAccessToken, setEmail) => {
  
  let status = "pending";
  let result;
  let suspend = promise.then(
    (res) => {
      status = "success";
      result = res;
    },
    (err) => {
      status = "error";
      result = err;
    }
  );

  return () => {
    if (status === "pending") {
      throw suspend;
    } else if (status === "error") {
      if (result?.response?.status === 401) {
        notification.error({
          message: result?.response?.data?.message,
        });
        setAccessToken(null);
        setEmail(null);
      }
      else{
        throw result;
      }
    } else if (status === "success") {
      return result;
    }
  };
};

const useFetchProtectedData = (url, method, senddata = {}) => {
  const [data, setData] = useState(null);
  const accessToken = useAuthStore((state) => state.accessToken);
  const setAccessToken = useAuthStore((state) => state.setAccessToken);
  const setEmail = useAuthStore((state) => state.setEmail);
  useEffect(() => {
    const getData = async () => {
      const config = {
        method: method,
        url: url,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      if (method.toLowerCase() === "get") {
        config.params = senddata;
      } else {
        config.data = senddata;
      }

      const promise = axiosInstance(config).then((res) => res?.data);

      setData(wrapPromise(promise, setAccessToken, setEmail));
    };

    getData();
  }, [url, method, JSON.stringify(senddata)]);

  return data;
};

export default useFetchProtectedData;