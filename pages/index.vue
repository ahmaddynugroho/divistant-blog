<script setup lang="ts">
const { loggedIn, user, session, clear } = useUserSession();
const userAsAny: any = user
import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms";
import type { LoginResponse } from "~/server/api/login.post";

type LoginValues = { username: string; password: string };

const toast = useToast();

const initialValues: LoginValues = reactive({
  username: "",
  password: "",
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

const onFormSubmit = async (e: FormSubmitEvent) => {
  if (e.valid) {
    const { username, password } = e.states;

    const { isSuccess }: LoginResponse = await $fetch(
      "/api/login",
      {
        method: "post",
        body: { username: username.value, password: password.value },
      },
    );

    if (isSuccess) {
      toast.add({
        severity: "success",
        summary: "Form is submitted.",
        life: 3000,
      });
      await navigateTo('/')
    } else {
      toast.add({
        severity: "error",
        summary: "Invalid credentials",
        life: 3000,
      });
    }
  }
};
</script>

<template>
  <div>
    <Toast />

    <div v-if="loggedIn">
      <h1>Welcome {{ userAsAny.username }}!</h1>
      <p>Logged in since {{ session.loggedInAt }}</p>
      <button @click="clear">Logout</button>
    </div>
    <div v-else>
      <h1>Not logged in</h1>
      <a href="/auth/github">Login with GitHub</a>
    </div>

    <Form
      v-slot="$form: any"
      :initialValues
      :resolver
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
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

    <Button v-if="loggedIn" severity="secondary" label="Logout" @click="() => clear()" />
  </div>
</template>
