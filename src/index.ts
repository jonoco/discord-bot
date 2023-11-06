import { Client, GatewayIntentBits, Events } from 'discord.js';
import { env } from '@/config/env';
import clientReady from '@/events/client-ready';
import interactionCreate from '@/events/interaction-create';
import guildCreate from '@/events/guild-create';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once(Events.ClientReady, clientReady);

client.on(Events.GuildCreate, guildCreate);
client.on(Events.InteractionCreate, interactionCreate);

client.login(env.DiscordToken);
