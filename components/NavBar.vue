<script setup lang="ts">
const { loggedIn, clear } = useUserSession()
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
      v-if="loggedIn"
      label="Add Post"
      @click="async () => await navigateTo('/post/add')"
      severity="secondary"
      outlined
    />
    <Button
      v-if="!loggedIn"
      label="Login"
      @click="async () => await navigateTo('/login')"
      severity="secondary"
      outlined
    />
    <Button
      v-if="loggedIn"
      label="Logout"
      @click="clear"
      severity="secondary"
      outlined
    />
  </div>
</template>
