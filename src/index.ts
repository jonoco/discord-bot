import { Client, Collection, GatewayIntentBits, Events } from "discord.js";
import { env } from "@/config/env";
import { commands } from "./commands";
import { deployCommands } from "./deploy/deploy-commands";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Bot is ready as ${c.user?.tag}`);
});

client.on("guildCreate", async (guild) => {
  await deployCommands({ guildId: guild.id });
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  const command = commands[commandName as keyof typeof commands];

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(env.DiscordToken);
