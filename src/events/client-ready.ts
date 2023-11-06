import { Client } from 'discord.js';

export default function clientReady(client: Client) {
  console.log(`Bot is ready as ${client.user?.tag}`);
}
