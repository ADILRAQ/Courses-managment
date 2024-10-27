import axios from "axios";

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

      // redirect to login of it is not /login or /signin
      if (status === 400)
        console.log('Redirect to login !');
      else
        return error.response;
    }
  }
);

export default _axios;