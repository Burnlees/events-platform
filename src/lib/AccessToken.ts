import { clerkClient, currentUser } from "@clerk/nextjs/server";

export const getGoogleAccessToken = async () => {
  try {
    const client = await clerkClient();
    const user = await currentUser();
    const provider = "oauth_google";

    if (!user) {
      throw new Error("User not found.");
    }

    const response = await client.users.getUserOauthAccessToken(
      user.id,
      provider,
    );

    const token = response.data[0]?.token;
    return token;
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
