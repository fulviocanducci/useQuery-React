export interface IPost {
  id: string;
  description: string;
}

export interface IPostList extends Array<IPost> {}

export interface IShow {
  id: string;
  status: boolean;
}
