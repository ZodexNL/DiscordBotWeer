const Discord = require('discord.js');

const bot = new Discord.Client();

const { token } = require('./config.json');

const { readdirSync, read } = require('fs');
const ms = require('ms');

const{ join } = require('path')

const config = require('./config.json');
bot.config = config;

bot.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');

const { prefix } = require('./config.json');


const commandFiles = readdirSync(join(__dirname, "commands")).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const  command = require(join(__dirname, "commands", `${file}`));
    bot.commands.set(command.name, command);
}




bot.on("error", console.error);

bot.on('ready', () => {
    console.log('Bot is ready!');
    bot.user.setActivity('Prefix is: n', { type: "WATCHING"}).catch(console.error);
    console.log(prefix);
})
bot.on("message", async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;

    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const command = args.shift().toLowerCase();

        if(!bot.commands.has(command)) return;


        try {
            bot.commands.get(command).run(bot, message, args);
        } catch (error){
            console.error(error);
        }
    }

})


bot.login(token);
