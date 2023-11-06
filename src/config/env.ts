import "dotenv/config";

export const env = {
  DiscordToken: process.env.DISCORD_TOKEN || "",
  DiscordAppId: process.env.DISCORD_APP_ID || "",
};

const missingEnv = Object.entries(env).filter(
  ([, value]) => !value || value === "",
);
if (missingEnv.length > 0) {
  throw new Error(
    `Missing environment variables: ${missingEnv
      .map(([key]) => key)
      .join(", ")}`,
  );
}
