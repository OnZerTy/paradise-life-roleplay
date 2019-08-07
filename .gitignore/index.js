const Discord = require('discord.js');

const client = new Discord.Client();

client.login("NjAyNTk1NjQ3MTI3OTQ1MjE2.XTTRzg.8ToWv4TgcxsPtlqRDz3ugAV466w");

var prefix = ("!");


client.on("message", (message) => {
    if(message.content === "bonjour") {
        message.channel.send("Salutation !")
    }

    if(message.content === prefix + "help"){
        message.channel.send("Veux-tu de l'aide ?")
    }
});

client.on('guildMemberAdd', member =>{
    member.guild.channels.get('599997650846220319').send(':tada: ** Bienvenue **' + member.user + ':smile: dans le serveur, je t`invite à regardé les règlements ci-dessous et de les acceptés pour passer ton entretien !');
    member.addRole('584344538022281216')
    console.log('+1')
})

client.on('guildMemberRemove', member =>{
    member.guild.channels.get('600000844514983957').send(':cry:'+ member.user + 'Nous a quitter bon voyage a lui !:cry:');
    console.log('-1')
})

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)
    if (args[0].toLowerCase() === prefix + "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let count = args[1]
        if (!count) return message.channel.send("Veuillez indiquer un nombre de message à supprimer")
        if (isNaN(count)) return message.channel.send("Veuillez indiquer un nombre valide")
        if (count < 1 || count > 100) return message.channel.send("Veuillez indiquer un nombre en 1 et 100")
        message.channel.bulkDelete(parseInt(count) + 1)
    }
})

client.on("message", message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLowerCase() === prefix + "warn") {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (member.highestRole.comparePositionTo(message.member.highestRole) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas warn ce membre")
        let reason = args.slice(2).join(' ')
        if (!member) return message.channel.send("Veuillez mentionner un membre")
        if (!reason) return message.channel.send("Veuillez indiquer une raison")
        if (!warns[member.id]) {
            warns[member.id] = []
        }
        warns [member.id].unshift({
            reason: reason,
            date: Date.now(),
            mod: message.author.id
        })
        fs.writeFileSync('./warns.json', JSON.stringify(warns))
        message.channel.send(member + "a été warn pour" + reason + " :white_check_mark:")
    }

    if (args[0].toLowerCase() === prefix + "infraction") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("Vous n'avez pas la permission d'utiliser cette commande")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send("Veuillez mentionner un memebre")
        let embed = new Discord.RichEmbed()
            .setAuthor(member.user.username, member.user.displayAvatarURL)
            .addField('10 derniers warns', ((warns [member.id]) ? warns[member.id].slice(0,10).map(e => e.reason) : "Ce membre n'a aucun warns"))
            .setTimestamp()
        message.channel.send(embed)
    }
});

module.exports.run = async (client, message, args) => {

    let début = date.now ();
    await message.channel.send("Ping").then(async(m)=> await m.edit(`Pong : ${Date.now() - début} ms`));

};

module.exports.help = {
    name:"ping"
};


const moment = require('moment');
module.exports.run = async(client, message, args) => {
    const membre = message.mentions.members.first() || message.member;

    message.channel.send({
        embed: {
            color: 0xe43333,
            totle: `Statistiques du l'utilisateur **${membre.user.username.tag}**`,
            thumbnall: {
                url: membre.user.displayAvatarURL
            },
            fields: [
                {
                name: "> ID :",
                value: membre.id
                },
                {
                    name: "Crée le :",
                    value: moment.utc(membre.user.createdAt).format("LL")
                },
               {
                    name: "Jeu :",
                    value:  `${membre.user.presence.game ? `${membre.user.presence.game.name}` : "Aucun jeu"}`
                },
                {
                    name: "Rejoin le :",
                    value: moment.utc(membre.joinedAt).format("LL")
                }
             ],
        footer: {
            text: `Informations de l'utilisateur ${membre.user.username}`
        }
        }
    })
};

module.exports.help = {
    name: "stats"
}
