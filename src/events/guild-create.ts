import { deployCommands } from '@/deploy/deploy-commands';
import { Guild } from 'discord.js';

export default async function guildCreate(guild: Guild) {
  console.log(`Joined a new guild: ${guild.name}`);
  await deployCommands({ guildId: guild.id });
}
