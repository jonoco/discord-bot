import { Command } from '@/types/types';
import {
  ApplicationCommandOptionType,
  CommandInteraction,
  CommandInteractionOption,
  SlashCommandBuilder,
} from 'discord.js';
import { sendQuestion } from '@/services/ai';

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

  const { result: validCommand, error: commandError } =
    validateCommand(command);
  if (commandError) {
    await interaction.reply(commandError.message);
    return;
  }

  const { result: question, error } = validateQuestion(validCommand);
  if (error) {
    await interaction.reply(error.message);
    return;
  }

  await interaction.deferReply();

  try {
    const { result: answer, error: questionError } =
      await sendQuestion(question);
    if (questionError) {
      await interaction.editReply(questionError.message);
      return;
    }

    const questionEcho = `> _${question}_\n`;
    await interaction.editReply(`${questionEcho}${answer}`);
  } catch (error) {
    console.error(error);

    const errorMsg =
      error instanceof Error
        ? error.message
        : 'There was a problem with your question';
    await interaction.editReply(errorMsg);
  }
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
