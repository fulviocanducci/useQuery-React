import axios from "axios";

const Axios = axios.create({
  baseURL: "https://192.168.2.107/api",
});

export const request = Axios;
