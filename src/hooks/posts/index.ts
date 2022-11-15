import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { IPost, IPostList } from "../../@types";
import { request } from "../../services";

export function usePost(paramQueryClient: QueryClient | undefined | null = null) {
  const queryClient = paramQueryClient || useQueryClient();
  const insert = async (model: IPost) => await request.post("posts", model);
  const all = async () => {
    const result = await request.get<IPost[]>("posts");
    if (result.status === 200) {
      return result.data;
    }
    return [];
  };
  const useResultQueryPost = () => {
    return useQuery<IPostList>("posts", all);
  };
  const useMutationPostInsert = () => {
    return useMutation(insert, {
      onSuccess(data) {
        const datas = queryClient.getQueryData<IPostList>("posts") || [];
        let newData: IPostList = [...datas, { ...data.data }];
        newData.sort((a: IPost, b: IPost) => a.description.toLocaleLowerCase().localeCompare(b.description.toLocaleLowerCase()));
        queryClient.setQueryData("posts", newData);
      },
    });
  };
  return { useMutationPostInsert, useResultQueryPost };
}
