import { ApplicationCommand, CommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute: (ci: CommandInteraction) => Promise<void>;
}
