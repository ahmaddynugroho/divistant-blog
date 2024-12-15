import { defineStore } from "pinia";

type Reaction = {
  likes: number;
  dislikes: number;
};

export type Post = {
  id: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: Reaction;
  views?: number;
  userId?: number;
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
      this.posts = this.posts.filter((p) => p.id !== id);
    },
    detail(id: number) {
      return this.posts.find((p) => p.id === id) as Post;
    },
    edit(id: number, title: string, body: string) {
      const i = this.posts.findIndex((p) => p.id === id);
      this.posts[i].title = title;
      this.posts[i].body = body;
      return { success: true };
    },
    add(title: string, body: string) {
      this.posts.push({
        id: Date.now(),
        title,
        body,
      });
      return { success: true };
    },
  },
});
