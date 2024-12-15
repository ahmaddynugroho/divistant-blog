<script setup lang="ts">
import { usePostStore } from "#build/imports";

const posts = usePostStore();
if (posts.posts.length === 0) {
  posts.fetch();
}

const { loggedIn } = useUserSession();
</script>

<template>
  <div class="m-4">
    <NavBar class="mb-4" />

    <Message v-if="posts.posts.length === 0" severity="info" size="small"
      >Fetching posts...</Message
    >

    <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
      <Card v-for="p in posts.posts" :key="p.id" class="bg-primary-800">
        <template #title>
          <NuxtLink :to="'/post/' + p.id">
            {{ p.title }}
          </NuxtLink>
        </template>

        <template #content>
          <p class="m-0">
            {{ p.body }}
          </p>
        </template>

        <template v-if="loggedIn" #footer>
          <div class="flex gap-4 mt-1">
            <Button
              label="Delete"
              severity="secondary"
              outlined
              class="w-full"
              @click="() => posts.delete(p.id)"
            />
            <Button
              label="Edit"
              class="w-full"
              @click="async () => await navigateTo('/post/' + p.id + '/edit')"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
