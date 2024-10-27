import axios from "axios";
import { Router } from "next/router";

const _axios = axios.create(
  {
    baseURL: '/api',
    headers: {
      'Content-Type': 'application/json',
    }
  }
);

_axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    if (error.response) {
      const {status} = error.response;

      // redirect to login of it is not /login
      if (status === 400)
        window.location.href = '/login';
      else
        return error.response;
    }
  }
);

export default _axios;