# AI discord bot

## Setup the bot
Follow the [discord.js guide](https://discordjs.guide/#before-you-begin) to create a bot and add it to a server.

### Add .env file
Create a `.env` file from the `.env.template` in the root directory of the project. `DISCORD_BOT_GUILD_ID` is the id of the server the bot is added to. It's not recommended to add the bot to multiple servers.

### Setup with oobabooga collab
[oobabooga collab](https://gist.github.com/jonoco/1c07cf7eb937c0330c5e53f967086674)

An OpenAI compatible api will be generated from this collab. The URL can be found in the console after `OpenAI compatible API URL`.

![openai api url](https://github.com/jonoco/discord-bot/assets/6710301/18bf178a-6f6d-4970-82b8-0e20eedc4861)

### Configure the adapter
A model adapter will need to be created in `src/config/models` from the `model.template.yml`. For example,
```yml
name: mistral
description: The mistral model hosted on oobabooga collab
url: https://sandwich-descriptions-ease-wto.trycloudflare.com
```
*Note:* Be sure to remove the `/v1` from the end of the url that the collab generates.

### Deploy the bot
The bot can be run with `npm start`. 

The first time the bot is run, it will need the commands to be registered. This can be done with `npm run deploy-commands`. The commands will need to be redeployed after any changes to the commands.

### Set the adapter
The adapter can be set from the bot using the `/model set` command. The choices will be based on the `name` field of the adapters.

### Interact with the bot
The bot can be interacted with using the `/ask` for a zero-context question.
