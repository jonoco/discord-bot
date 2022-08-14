const fs = require('fs')
const { Client, Intents, Collection, GatewayIntentBits } = require('discord.js')
const { getJoke } = require('./joke')
const { token } = require('./config.json')

require('dotenv').config()

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages
    ]
})

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))
for (const file of eventFiles) {
    const event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.on('ready', () => {
    console.log('Bot is ready')
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return
    
    console.log(`interaction: ${interaction}`)

	const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
    }
})

client.login(token)