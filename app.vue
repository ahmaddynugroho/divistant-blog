<template>
  <div>
    <h1 class="text-3xl font-bold underline">tailwind test</h1>
    <h1 class="text-3xl font-bold underline text-primary-400">tailwind test</h1>
    <Button label="Verify" />
    <Button label="Verify Tailwind" class="bg-primary-400" />
    <Button label="Verify Icon">
      <template #icon>
        <Icon name="uil:github" style="color: black" />
      </template>
    </Button>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    1. primevue 2. tailwind 3. setup noir
  </div>
</template>
