import { env } from '@/config/env';
import { deployCommands } from '@/deploy/deploy-commands';

(async () => {
  deployCommands({ guildId: env.DiscordBotGuildId });
})();
