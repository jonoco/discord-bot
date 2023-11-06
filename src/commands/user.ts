import { Command } from '@/types/types';
import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('user')
  .setDescription('Replies with user info!');

async function execute(interaction: CommandInteraction) {
  await interaction.reply(
    `Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`
  );
}

const command: Command = {
  data,
  execute,
};
export default command;
