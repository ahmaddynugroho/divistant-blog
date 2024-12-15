<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms";
import { Password } from "primevue";
import { reactive } from "vue";

const { fetch } = useUserSession()
const isFetching = ref(false);
const loginError = ref(false);

const initialValues = reactive({
  username: "emilys",
  password: "emilyspass",
});

const resolver = ({ values }: FormResolverOptions) => {
  const errors: any = {};

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

const onFormSubmit = async ({ valid, states }: FormSubmitEvent) => {
  if (valid) {
    isFetching.value = true

    try {
      await $fetch('/api/login', {
        method: 'post',
        body: {
          username: states.username.value,
          password: states.password.value,
        }
      })

      await fetch()
      await navigateTo('/')
    } catch (error) {
      loginError.value = true
      console.log('error', error)
    }

    isFetching.value = false
  }
};
</script>

<template>
  <div class="p-4 flex justify-center w-full">
    <!-- <p v-if="auth.loggedIn">logged in {{ auth.user }}</p> -->
    <Form
      v-slot="$form: any"
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
      <Button :loading="isFetching" type="submit" severity="secondary" label="Submit" />
    </Form>
    <!-- <Button v-if="auth.loggedIn" severity="secondary" label="Logout" @click="auth.logout()" /> -->
  </div>
</template>
