import { models } from '@/config/models';
import { db } from '@/services/db';
import { Command } from '@/types/types';
import {
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  CommandInteraction,
  CommandInteractionOption,
  SlashCommandBuilder,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('model')
  .setDescription('Choose model for ai to use')
  .addSubcommand((subcommand) =>
    subcommand.setName('list').setDescription('List all available models')
  )
  .addSubcommand((subcommand) =>
    subcommand.setName('get').setDescription('Get the current model')
  )
  .addSubcommand((subcommand) =>
    subcommand
      .setName('set')
      .setDescription('Set the model')
      .addStringOption((option) =>
        option
          .setName('model')
          .setDescription('The model you want to use')
          .setRequired(true)
          .addChoices(
            ...models.map((adapter) => {
              return { name: adapter.name, value: adapter.name };
            })
          )
      )
  );

async function execute(interaction: CommandInteraction) {
  if (!interaction.isChatInputCommand()) return;

  const sub = interaction.options.getSubcommand();
  switch (sub) {
    case 'list':
      await list(interaction);
      break;
    case 'get':
      await get(interaction);
      break;
    case 'set':
      await set(interaction);
      break;
    default:
      await interaction.reply('Unknown subcommand');
  }
}

async function list(interaction: ChatInputCommandInteraction) {
  const modelNames = models
    .map((adapter) => `\n- ${adapter.name} | ${adapter.description}`)
    .join('');
  await interaction.reply(`The available models are: ${modelNames}`);
}

async function get(interaction: ChatInputCommandInteraction) {
  const modelName = await db.get('model');
  const model = models.find((adapter) => adapter.name === modelName);
  const msg = !!model
    ? `The current model is _${model.name}_ - ${model.description}`
    : 'There is no model set';
  await interaction.reply(msg);
}

async function set(interaction: ChatInputCommandInteraction) {
  const model = interaction.options.getString('model');
  const { error: modelError } = validateModel(model);
  if (modelError) {
    await interaction.reply(modelError.message);
    return;
  }

  await db.put('model', model);
  await interaction.reply(`The model is now set to _${model}_`);
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

function validateModel(model: string | null) {
  if (!model) {
    return { error: new Error('Model was null!') };
  }

  const adapter = models.find((adapter) => adapter.name === model);
  if (!adapter) {
    return { error: new Error('Model not found!') };
  }

  return { result: adapter };
}

const command: Command = {
  data,
  execute,
};
export default command;
