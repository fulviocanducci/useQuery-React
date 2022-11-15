import { AxiosResponse } from "axios";
import request from "../../services";

function useRequestApi<T>(path: string) {
  const api = request.api;
  function get(): Promise<AxiosResponse<T[], any>> {
    return api.get<T[]>(path);
  }
  function find(id: number | string | null): Promise<AxiosResponse<T, any>> {
    return api.get<T>(path + "/" + (id ?? ""));
  }
  function post(data: T): Promise<AxiosResponse<T, any>> {
    return api.post<T>(path, data);
  }
  function put(data: T, id: number | string | null): Promise<AxiosResponse<T, any>> {
    return api.put(path + "/" + (id ?? ""), data);
  }
  function del(id: number | string | null): Promise<AxiosResponse<T, any>> {
    return api.delete(path + "/" + (id ?? ""));
  }
  return { get, find, post, put, del };
}

export default useRequestApi;
