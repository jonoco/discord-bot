import { ApplicationCommand, CommandInteraction } from 'discord.js';

export interface Command {
  data: SlashCommandBuilder;
  execute: (ci: CommandInteraction) => Promise<void>;
}

export interface OpenAiApiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: OpenAiApiChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

interface OpenAiApiChoice {
  index: number;
  finish_reason: string;
  message: {
    role: string;
    content: string;
  }
}
