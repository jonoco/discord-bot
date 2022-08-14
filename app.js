const { Client, Intents } = require('discord.js')
const { getJoke } = require('./joke')

require('dotenv').config()

const client = new Client({ 
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES
    ],
    partials: [
        'MESSAGE', 'REACTION', 'CHANNEL', 'USER'
    ] 
})

client.on('ready', () => {
    console.log('Bot is ready')
})

client.on('messageCreate', msg => {
    if (msg.content === 'Hello')
        msg.reply('Hi')
    
    if (msg.content === '?joke')
        msg.channel.send(getJoke())
})

client.on('messageReactionAdd', async (reaction, user) => {
    console.log('messageReactionAdd')

    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return
    if (!reaction.message.guild) return

    if (reaction.message.channel.id == '915720510954962947') {
        console.log(reaction.emoji.name)

        if (reaction.emoji.name === '🐴 ') {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add('915753145659965450')
        }
        if (reaction.emoji.name === '🌻') {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add('915753187397472256')
        }
        if (reaction.emoji.name === '🥣') {
          await reaction.message.guild.members.cache
            .get(user.id)
            .roles.add('915753475927842816')
        }
    } else return
})

client.on('messageReactionRemove', async (reaction, user) => {
    console.log('messageReactionRemove')

    if (reaction.message.partial) await reaction.message.fetch()
    if (reaction.partial) await reaction.fetch()
    if (user.bot) return
    if (!reaction.message.guild) return
    
    if (reaction.message.channel.id == '915720510954962947') {
      if (reaction.emoji.name === '🐴') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('915753145659965450')
      }
      if (reaction.emoji.name === '🌻') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('915753187397472256')
      }
      if (reaction.emoji.name === '🥣') {
        await reaction.message.guild.members.cache
          .get(user.id)
          .roles.remove('915753475927842816')
      }
    } else return
  })

client.login(process.env.BOT_TOKEN)