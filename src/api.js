import axios from "axios";

export const api = axios.create({
  baseURL: "https://ml44zxkxn8.execute-api.us-east-1.amazonaws.com",
  timeout: 10000,
  // headers: { "X-Custom-Header": "foobar" },
});
