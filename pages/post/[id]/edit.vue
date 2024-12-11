<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
</script>

<template>
  <div>
    <p>ini edit post {{ $route.params.id }}</p>
  </div>
</template>
