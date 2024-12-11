export type LoginResponse = {
  isSuccess: boolean;
};

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  const { username, password } = await readBody(event);
  if (username === "admin" && password === "admin123") {
    await setUserSession(event, {
      user: {
        username,
      },
    });

    return {
      isSuccess: true,
    };
  }
  return {
    isSuccess: false,
  };
});
