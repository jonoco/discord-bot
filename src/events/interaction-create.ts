import { commands } from '@/commands';
import { Interaction } from 'discord.js';

export default async function interactionCreate(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;
  const command = commands[commandName as keyof typeof commands];

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
}
