import { defineStore } from "pinia";

type Reaction = {
  likes: number;
  dislikes: number;
};

type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: Reaction;
  views: number;
  userId: number;
};

type PostApiResponse = {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
};

export const usePostStore = defineStore("postStore", {
  state: () => ({
    posts: [] as Post[],
  }),
  actions: {
    async fetch() {
      const data: PostApiResponse = await $fetch(
        "https://dummyjson.com/posts",
        {
          params: { limit: 10 },
        },
      );
      this.posts = data.posts;
    },
    delete(id: number) {
      this.posts = this.posts.filter((p) => p.id !== id)
    }
  },
});
