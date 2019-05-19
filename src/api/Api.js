import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_APIURL

export default {
  async requestApi(url, data, method) {
    var req = "";

    if (method === 'GET') {
      req = axios
        .get(url)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error.response);
          return error;
        });
    }
    else if (method === 'POST') {
      req = axios
        .post(url, data)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error.response);
          return error;
        });
    }
    else if (method === 'PUT') {
      req = axios
        .put(url, data)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error.response);
          return error;
        });
    }
    else if (method === 'DELETE') {
      req = axios
        .delete(url)
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error.response);
          return error;
        });
    }

    return req;
  }
};
