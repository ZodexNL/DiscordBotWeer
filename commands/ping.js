const Discord = require('discord.js');

module.exports = {
    name: "ping",
    aliases: ['p', 'pp'],
    cooldown: 1000 * 5,
    description: "p",

    async run (bot, message, args) {
        message.channel.send('pong!'); 
    }

}