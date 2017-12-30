const Discord = require("discord.js");
const config = require("./config.json");
const fs = require("fs");
let warnings = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
const client = new Discord.Client();
var variant = warnings.variant;
var oldvariant = warnings.variant;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function includes(k) {
    for(var i = 0; i < this.length; i++){
      if(this[i] === k || ( this[i] !== this[i] && k !== k ) ){
        return true;
      }
    }
    return false;
}

client.on('message', message => {

    if(message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const ruler = message.guild.roles.find("name", "kangarouxler");
    
    if (!warnings[message.author.id]) warnings[message.author.id] = {
        warnings: 0,
    };

    if(!message.member.roles.find("name", "kangarouxler") && message.content !== "kangaroux" && message.content !== warnings.variant && message.guild.channels.find("name", "kangaroux")){        message.delete();
        warnings[message.author.id].warnings++;
        console.log(warnings[message.author.id].warnings);
        if(warnings[message.member.id].warnings < 3) {
            message.guild.channels.find("name", "bangaroux").send(message.author + ', this is a warning for a violation of Rule 1 of r/kangaroux. Your message: "' + message.content + '". Acceptable messages: ' + variant + ', and kangaroux. Your total amount of bot warnings is ' + warnings[message.member.id].warnings + ". Punishments are subject to the kangarouxler.");
        } else {
            message.guild.channels.find("name", "bangaroux").send(message.author + ', this is an alert for a violation of Rule 1 of r/kangaroux. Your message: "' + message.content + '". Acceptable messages: ' + variant + ', and kangaroux. Your total amount of bot warnings is ' + warnings[message.member.id].warnings + ". Further punishments are required and are subject to kangarouxler <@195637381121048577>");
        }
        console.log("Rejected message ");
        return;
    }

    if(message.content.indexOf(config.prefix) === 0) {

        if(command === "clear") {
            message.delete();
            warnings[args[0]] = 0;
            message.guild.channels.find("name", "bangaroux").send(message.author + " has cleared <@" + args[0] + ">'s warnings.")
        }

        if(command === "variants") {
            message.delete();
            message.channel.send(warnings.kangarray);
            console.log(warnings.kangarray);
        }

        if(command === "variantsadd") {
            if(/\S/.test(args)) {
                if(warnings.kangarray.includes(String(args))) {
                    message.delete();
                    message.channel.send(args + " already exists in the kangarray.");
                    console.log("Rejected variantsadd" + warnings.kangarray);
                } else {
                    message.delete();
                    warnings.kangarray.push(String(args));
                    message.channel.send("Succesfully added " + args + " to the kangarray.");
                    console.log("Accepted variantsadd " + warnings.kangarray);
                }
            } else {
                message.delete();
                message.channel.send("Please put a valid kangaelement.");
                console.log("Rejected variantsadd");
            }
        }
        if(command === "variantsremove") {
            if(/\S/.test(args)) {
                var indexArr = -1;
                for(var i = 0; i < warnings.kangarray.length; i++) {
                    if(warnings.kangarray[i] === String(args)){
                        indexArr = i;
                        break;
                    }
                }
                if(indexArr > -1) {
                    message.delete();
                    warnings.kangarray.splice(indexArr, 1);
                    message.channel.send("Succesfully removed " + args + " from the kangarray.");
                    console.log("Accepted variantsremove " + warnings.kangarray);
                } else {
                    message.delete(); 
                    message.channel.send("Cannot find " + args + " in the kangarray.");
                    console.log("Rejected variantsremove");
                }
            } else {
                message.delete();
                message.channel.send("Please put a valid kangaelement.");
            }
        }
        if(command === "set") {
            if(/\S/.test(args)) {
                message.delete();
                warnings.variant = String(args);
                message.guild.channels.find("name", "kangarouxles").send("@everyone, the new variant is " + warnings.variant);
                message.channel.send("Succesfully changed variant to " + warnings.variant + ".");                
            } else {
                message.delete();
                var newvariant = warnings.kangarray[Math.floor(Math.random()*warnings.kangarray.length)];
                console.log(newvariant);
                while(newvariant === variant || newvariant === oldvariant) {
                    newvariant = warnings.kangarray[Math.floor(Math.random()*warnings.kangarray.length)];
                    console.log(newvariant);
                }
                warnings.variant = newvariant;
                message.guild.channels.find("name", "kangarouxles").send("@everyone, the new variant is " + warnings.variant);
                message.channel.send("No argument was supplied, succesfully randomzied and chose " + warnings.variant + " as a variant.");
            }
            oldvariant = variant;
            variant = warnings.variant;
        }
    }
    fs.writeFile("./warnings.json", JSON.stringify(warnings), (err) => {
        if (err) console.error(err)
    });
});

client.login(process.env.BOT_TOKEN);
        
