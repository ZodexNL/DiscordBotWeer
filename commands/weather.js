const weather = require('weather-js');

const Discord = require('discord.js');

module.exports = {
    name: "weer",
    description: "Laat het weer zien in een bepaalde locatie",

    async run (bot, message, args) {
        weather.find({search: args.join(" "), degreeType: `C`}, function (error, result) {

            if(!args[0]) return message.channel.send('Vul een locatie in! > nweer locatie')

            if(result === undefined || result.length === 0) return message.channel.send('Ongeldige locatie')

            var current = result[0].current;
            var location = result[0].location;

            const embed = new Discord.MessageEmbed()
                .setColor(0x111111)
                .setAuthor(`Weer voorspelling voor ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setDescription(`**${current.skytext}**`)
                .addField('Tijdzone', `UTC ${location.timezone}`, true)
                .addField('Graden Type', 'Celcius', true)
                .addField('Temperatuur', `${current.temperature}°`, true)
                .addField('Wind', `${current.winddisplay}`, true)
                .addField('Voelt als', `${current.feelslike}°`, true)
                .addField('Luchtvochtigheid', `${current.humidity}%`, true)

            message.channel.send(embed)
        })
    }
}