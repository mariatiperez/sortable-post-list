import axios from "axios";
import type { AxiosInstance } from "axios";
import type { ListItemI } from "./../types";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});

export const getList = (): Promise<ListItemI[]> => {
  return apiClient.get("/posts").then(({ data }) => data.slice(0, 5));
};
