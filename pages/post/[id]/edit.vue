<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})

import { reactive } from "vue";
import { useToast } from "primevue/usetoast";
import type { FormResolverOptions, FormSubmitEvent } from "@primevue/forms";

const route = useRoute();
const toast = useToast();
const posts = usePostStore();

const initialValues = reactive({
  title: "",
  body: "",
});
const post = posts.detail(Number(route.params.id));
initialValues.title = post.title;
initialValues.body = post.body;

const resolver = ({ values }: FormResolverOptions) => {
  const errors: any = {};

  if (!values.title) {
    errors.title = [{ message: "Title is required." }];
  }
  if (!values.body) {
    errors.body = [{ message: "Body is required." }];
  }

  return {
    errors,
  };
};

const onFormSubmit = ({ valid, states }: FormSubmitEvent) => {
  if (valid) {
    const { title, body } = states
    const { success } = posts.edit(Number(route.params.id), title.value, body.value)
    if (success) {
      toast.add({
        severity: "success",
        summary: "Post edited!",
        life: 3000,
      });
      return navigateTo('/')
    }
  }
};
</script>

<template>
  <div class="p-4 w-full flex justify-center">
    <div>
      <NavBar class="mb-4" />

      <Form
        v-slot="$form: any"
        :initialValues
        :resolver
        @submit="onFormSubmit"
        class="flex flex-col gap-4 w-full sm:w-56"
      >
        <InputText name="title" type="text" placeholder="Title" fluid />
        <Message
          v-if="$form.title?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.title.error?.message }}</Message
        >

        <Textarea name="body" rows="5" cols="30" />
        <Message
          v-if="$form.body?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.body.error?.message }}</Message
        >

        <Button type="submit" severity="secondary" label="Submit" />
      </Form>
    </div>
  </div>
</template>
