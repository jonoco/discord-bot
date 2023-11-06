import { deployCommands } from '@/deploy/deploy-commands';
import { Guild } from 'discord.js';

export default async function guildCreate(guild: Guild) {
  await deployCommands({ guildId: guild.id });
}
