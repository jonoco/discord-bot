const { SlashCommandBuilder } = require('@discordjs/builders')
const { getJoke } = require('../joke')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Replies with a joke!'),
    async execute(interaction) {
        await interaction.reply(getJoke())
    }
}
