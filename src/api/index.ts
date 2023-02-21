import axios from "axios";
import type { AxiosInstance } from "axios";
import type { ListItemI } from "./../types";

const apiClient: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json",
  },
});

export const getList = async (): Promise<ListItemI[]> => {
  try {
    return (await apiClient.get("/posts")).data?.slice(0, 5);
  } catch (e) {
    return [];
  }
};
