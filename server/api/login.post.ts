type DummyUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  const res: DummyUser = await $fetch("/dummy/auth/login", {
    method: "post",
    body: {
      username,
      password,
    },
  });

  await setUserSession(event, {
    user: { ...res },
  });

  return { status: "success", user: res };
});
