<script setup lang="ts">
const { loggedIn, clear } = useUserSession();
</script>

<template>
  <div class="flex gap-2">
    <Button
      label="Home"
      severity="secondary"
      outlined
      @click="async () => await navigateTo('/')"
    />
    <Button
      v-if="loggedIn"
      label="Add Post"
      severity="secondary"
      outlined
      @click="async () => await navigateTo('/post/add')"
    />
    <Button
      v-if="!loggedIn"
      label="Login"
      severity="secondary"
      outlined
      @click="async () => await navigateTo('/login')"
    />
    <Button
      v-if="loggedIn"
      label="Logout"
      severity="secondary"
      outlined
      @click="clear"
    />
  </div>
</template>
