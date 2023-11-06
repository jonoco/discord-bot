import { Command } from '@/types/types';
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOption,
  SlashCommandBuilder,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ask')
  .setDescription('Ask the bot a question')
  .addStringOption((option) =>
    option
      .setName('question')
      .setDescription('The question you want to ask')
      .setRequired(true)
  );

async function execute(interaction: CommandInteraction) {
  const command = interaction.options.get('question');

  console.log('question command', command);

  const {result: validCommand, error: commandError} = validateCommand(command);
  if (commandError) {
    await interaction.reply(commandError.message);
    return;
  }

  console.log('validCommand', validCommand);

  const { result: question, error } = validateQuestion(validCommand);
  if (error) {
    await interaction.reply(error.message);
    return;
  }

  console.log('question', question);

  await interaction.reply(`I don't know anything about ${question}`);
}

function validateCommand(command: CommandInteractionOption | null) {
  if (!command) {
    return { error: new Error('Command was null!') };
  }

  if (command.type !== ApplicationCommandOptionType.String) {
    return { error: new Error('Question must be a string!') };
  }

  return { result: command };
}

function validateQuestion(command: CommandInteractionOption) {
  const question = command.value;
  if (!question) {
    return { error: new Error('You need to provide a question!') };
  }

  if (typeof question !== 'string') {
    return { error: new Error('Question must be a string!') };
  }

  return { result: question };
}

const command: Command = {
  data,
  execute,
};
export default command;
