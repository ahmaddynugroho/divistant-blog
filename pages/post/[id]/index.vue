<script setup lang="ts">
const route = useRoute()
const posts = usePostStore()
const post = ref()

post.value = posts.detail(Number(route.params.id))
</script>

<template>
  <div class="m-4">
    <NavBar class="mb-4" />
    <h1 class="text-3xl">{{ post.title }}</h1>
    <p class="text-sm text-primary-400">{{ post.tags.join(', ') }}</p>
    <p class="text-primary-100">{{ post.body }}</p>
  </div>
</template>
