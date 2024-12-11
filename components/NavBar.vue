<script setup lang="ts">
const auth = useAuthStore()
</script>

<template>
  <div class="flex gap-2">
    <Button
      label="Home"
      @click="async () => await navigateTo('/')"
      severity="secondary"
      outlined
    />
    <Button
      v-if="auth.loggedIn"
      label="Add Post"
      @click="async () => await navigateTo('/post/add')"
      severity="secondary"
      outlined
    />
    <Button
      v-if="!auth.loggedIn"
      label="Login"
      @click="async () => await navigateTo('/login')"
      severity="secondary"
      outlined
    />
    <Button
      v-if="auth.loggedIn"
      label="Logout"
      @click="auth.logout"
      severity="secondary"
      outlined
    />
  </div>
</template>
