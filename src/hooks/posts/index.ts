import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { IPost } from "../../@types";
import useRequestApi from "../request";

export function usePost(queryClient: QueryClient | undefined | null = null) {
  const request = useRequestApi<IPost>("posts");
  const client = queryClient || useQueryClient();

  async function insert(model: IPost) {
    return await request.post(model);
  }

  async function update(model: IPost) {
    return await request.put(model, model.id);
  }

  function useQueryPosts() {
    return useQuery("posts", async () => {
      const result = await request.get();
      return result?.data || [];
    });
  }

  function useMutationInsert() {
    return useMutation(insert, {
      onSuccess(data) {
        const datas = client.getQueryData<IPost[]>("posts") || [];
        let newData: IPost[] = [...datas, { ...data.data }];
        newData.sort((a: IPost, b: IPost) => a.description.toLocaleLowerCase().localeCompare(b.description.toLocaleLowerCase()));
        client.setQueryData("posts", newData);
      },
    });
  }

  function useMutationUpdate() {
    return useMutation(update, {
      onSuccess(data) {
        const datas = client.getQueryData<IPost[]>("posts") || [];
        let newData: IPost[] = [...datas, { ...data.data }];
        newData.sort((a: IPost, b: IPost) => a.description.toLocaleLowerCase().localeCompare(b.description.toLocaleLowerCase()));
        client.setQueryData("posts", newData);
      },
    });
  }

  return { useMutationInsert, useMutationUpdate, useQueryPosts, client };
}
