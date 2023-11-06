import { Command } from '@/types/types';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('server')
  .setDescription('Replies with server info!');

async function execute(interaction: CommandInteraction) {
  if (!interaction.guild) return;

  await interaction.reply(
    `Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`
  );
}

const command: Command = {
  data,
  execute,
};
export default command;
