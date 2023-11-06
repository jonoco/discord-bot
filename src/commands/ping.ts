import { Command } from '@/types/types';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

async function execute(interaction: CommandInteraction) {
  await interaction.reply('Pong!');
}

const command: Command = {
  data,
  execute,
};
export default command;
