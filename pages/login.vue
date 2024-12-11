<script setup lang="ts">
definePageMeta({
  middleware: ["auth"]
})

import { Password } from "primevue";
import { reactive } from "vue";

const auth = useAuthStore();
const loginError = ref(false);

const initialValues = reactive({
  username: "admin",
  password: "admin123",
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.username) {
    errors.username = [{ message: "Username is required." }];
  }
  if (!values.password) {
    errors.password = [{ message: "Password is required." }];
  }

  return {
    errors,
  };
};

const onFormSubmit = ({ valid, states }) => {
  if (valid) {
    const { success } = auth.login(
      states.username.value,
      states.password.value,
    );
    if (success) {
      return navigateTo("/");
    } else {
      loginError.value = true;
    }
  }
};
</script>

<template>
  <div class="p-4 flex justify-center w-full">
    <!-- <p v-if="auth.loggedIn">logged in {{ auth.user }}</p> -->
    <Form
      v-slot="$form"
      :initialValues
      :resolver
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <Message v-if="loginError" size="small" severity="error"
          >Wrong credentials</Message
        >

        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message
          v-if="$form.username?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.username.error?.message }}</Message
        >

        <Password
          name="password"
          placeholder="Password"
          :feedback="false"
          fluid
        />
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.password.error?.message }}</Message
        >
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
    <!-- <Button v-if="auth.loggedIn" severity="secondary" label="Logout" @click="auth.logout()" /> -->
  </div>
</template>
