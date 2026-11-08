import axios from "axios";

export const HTTPClient = axios.create({
  baseURL: "http://localhost:5080",
  headers: {
    "Content-Type": "application/json",
  },
});
