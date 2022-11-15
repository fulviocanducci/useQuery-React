import axios from "axios";

const Axios = axios.create({
  baseURL: "https://192.168.2.107/api",
});

const request = {
  api: Axios,
};

export default request;
