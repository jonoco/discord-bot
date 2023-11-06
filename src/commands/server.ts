import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("server")
  .setDescription("Replies with server info!");

export async function execute(interaction: CommandInteraction) {
  if (!interaction.guild) return;

  await interaction.reply(
    `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`,
  );
}
