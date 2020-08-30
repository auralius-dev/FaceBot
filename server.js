const Eris = require("eris");
require("dotenv").config();
const bot = new Eris(process.env.TOKEN);
const fs = require("fs");
const request = require("request");
const http = require("http");
const express = require("express");
const app = express();

const readline = require("readline").createInterface({	//Allow input from console.
	input: process.stdin,
	output: process.stdout
});

readline.on("line", (input) => {	//Add commands.
	console.log(getTime(), `Received: ${input}`);
	if (input == "help") {
		console.log(getTime(), "help - this page.");
		console.log(getTime(), "stop - stop the server.");
	}
	if (input == "stop") {
		console.log(getTime(), "Goodbye!");
		process.exit();
	}
	if (input == "reload") {
		console.log(getTime(), "Reloading..");
		process.exit();
	}
});

function getTime() {	//Get the time and date formatted.
	var today = new Date();
	var date = (today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	return date + " " + time + ":";
}

bot.on("ready", () => {	//Start stuff when bot is ready.
	console.clear();
	console.log(getTime(), "Ready!\n");
	bot.editStatus("online", {
		name: "!fhelp",
		type: 2
	});
});

app.get("/", (request, response) => {	//If a request is received respond with 200.
	console.log(getTime(), "Pong.\n");
	response.sendStatus(200);
});
app.listen(3000);

//setInterval(() => {	//Glitch likes to put projects to sleep after 5 minutes if theres no activity, so this pings it. (Currently doesn"t work) 666
//	console.log(getTime(), "Ping.\n");
//	request("http://horn-adventurous-silence.glitch.me:3000");
//}, 280000);

bot.on("messageCreate", (msg) => {
	//send back you
	if (msg.content.includes("!fuck")) {
		bot.createMessage(msg.channel.id, "You.");	//My friends like to disrespect this bot by saying this command, so I added functionality. c:
	}
	//send back no
	if (msg.content.includes("!fgun")) {	//Also they want guns but I can"t train anything as I have nothing.
		bot.createMessage(msg.channel.id, "No.");
	}
	//~~~~~~~~~~~ API ~~~~~~~~~~~~
	function genImage(command, filename, link) {	//Function to send a message with a attachment from the web.
		console.log(getTime(), "Command called by " + msg.author.username + `. (${command})\n`);
		const download = (url, path, callback) => {
			request.head(url, (err, res, body) => {	//Body not used res not used err not used. 666
				request(url)
					.pipe(fs.createWriteStream(path))
					.on("close", callback);
			});
		};
		
		const url = link;	//Variables for above.
		const path = `images/api/${filename}`;
		download(url, path, () => {
			console.log(getTime(), "Downloaded image.\n");
		});
		
		fs.readFile(`images/api/${filename}`, (err, data) => { //Sending the attachment and text.
			if (data === null) bot.createMessage(msg.channel.id, "Error! Could not send image, please try again. (404)");
			bot.createMessage(msg.channel.id, "Here you go!", {
				file: data,
				name: `${filename}`
			});
		});
	}
	//Send a face.
	if (msg.content.includes("!face")) {
		genImage("!face", "face.jpg", "https://thispersondoesnotexist.com/image");
	}
	//Send a waifu.
	if (msg.content.includes("!fanime")) {
		genImage("!fanime", "waifu.jpg", "https://www.thiswaifudoesnotexist.net/example-" + (Math.floor(Math.random() * 100000)).toString() + ".jpg");
	}
	//Send a cat.
	if (msg.content.includes("!fcat")) {
		genImage("!fcat", "cat.jpg", "https://thiscatdoesnotexist.com");
	}
	//Send a bed.
	if (msg.content.includes("!froom")) {
		var rand = (Math.floor(Math.random() * 5) + 1);
		if (rand == 1) {
			genImage("!froom", "room.jpg", "https://thisrentaldoesnotexist.com/img-new/hero.jpg");
		} else if (rand == 2) {
			genImage("!froom", "room.jpg", "https://thisrentaldoesnotexist.com/img-new/img1.jpg");
		} else if (rand == 3) {
			genImage("!froom", "room.jpg", "https://thisrentaldoesnotexist.com/img-new/img2.jpg");
		} else if (rand == 4) {
			genImage("!froom", "room.jpg", "https://thisrentaldoesnotexist.com/img-new/img3.jpg");
		} else if (rand == 5) {
			genImage("!froom", "room.jpg", "https://thisrentaldoesnotexist.com/img-new/img4.jpg");
		}
	}
	//Send a vase.
	if (msg.content.includes("!fvase")) {
		var str = "" + (Math.floor(Math.random() * 20000)).toString();
		var ans = ("0000000" + str).substring(str.length);
		genImage("!fvase", "vase.jpg", "http://thisvesseldoesnotexist.s3-website-us-west-2.amazonaws.com/public/v2/fakes/" + ans + ".jpg");
	}
	//Send a chinese vase.
	if (msg.content.includes("!fcvase")) {
		var str = "" + (Math.floor(Math.random() * 999)).toString();
		var ans = ("0000000" + str).substring(str.length);
		genImage("!fcvase", "cvase.jpg", "http://thisvesseldoesnotexist.s3-website-us-west-2.amazonaws.com/public/qinghua/" + ans + ".jpg");
	}
	//Send a diverse vase.
	if (msg.content.includes("!fdvase")) {
		var str = "" + (Math.floor(Math.random() * 4000)).toString();
		var ans = ("0000000" + str).substring(str.length);
		genImage("!fdvase", "dvase.jpg", "http://thisvesseldoesnotexist.s3-website-us-west-2.amazonaws.com/public/diverse/" + ans + ".jpg");
	}
	//Send a beetle vase.
	if (msg.content.includes("!fbvase")) {
		var str = "" + (Math.floor(Math.random() * 200)).toString();
		var ans = ("0000000" + str).substring(str.length);
		genImage("!fbvase", "dvase.jpg", "http://thisvesseldoesnotexist.s3-website-us-west-2.amazonaws.com/public/v2/beetlevase/gallery/" + ans + ".jpg");
	}
	//Send a dress vase.
	if (msg.content.includes("!fdrvase")) {
		var str = "" + (Math.floor(Math.random() * 506)).toString();
		var ans = ("0000000" + str).substring(str.length);
		genImage("!fdrvase", "drvase.jpg", "http://thisvesseldoesnotexist.s3-website-us-west-2.amazonaws.com/public/v2/dresses/" + ans + ".jpg");
	}
	//Send a painting. (or somthing of the sort)
	if (msg.content.includes("!fart")) {
		genImage("!fart", "art.jpg", "https://thisartworkdoesnotexist.com");
	}
	//Send a horse. (or demons)
	if (msg.content.includes("!fhorse")) {
		genImage("!fhorse", "horse.jpg", "https://thishorsedoesnotexist.com");
	}
	//Send a business face.
	if (msg.content.includes("!bface")) {
		var str = "" + (Math.floor(Math.random() * 649)).toString();
		var ans = ("00000" + str).substring(str.length);
		genImage("!bface", "bface.jpg", "https://vole.wtf/this-mp-does-not-exist/mp/mp" + ans + ".jpg");
	}
	//Send a pony.
	if (msg.content.includes("!fpony")) {
		var str = "" + (Math.floor(Math.random() * 99999)).toString();
		var ans = ("00000" + str).substring(str.length);
		genImage("!fpony", "pony.jpg", "https://thisponydoesnotexist.net/v1/w2x-redo/jpgs/seed" + ans + ".jpg");
	}
	
	if (msg.content.includes("!fhelp")) {	//Embed help. Embeds with attachments took me way too long to figure out.
		console.log(getTime(), "Command called by " + msg.author.username + ". (!fhelp)\n");
		fs.readFile("images/icon/icon_r.webp", (err, data) => {
			bot.createMessage(msg.channel.id, {
				embed: {
					thumbnail: {
						url: "attachment://icon.webp"
					},
					title: "Hello!",
					description: "I'm a bot to generate **unique** faces!",
					author: {
						name: msg.author.username,
						icon_url: msg.author.avatarURL
					},
					color: 0x562a43,
					fields: [
						{
							name: "How do I use it?",
							value: "Send '!face' in a channel\nor a direct message.",
							inline: true
						},
						{
							name: "How does it work?",
							value: "[Stylegan2](https://github.com/NVlabs/stylegan2)",
							inline: true
						},
						{
							name: "Any other cool commands?",
							value: "!face - Send a face.\n!fhelp - Send this page.\n!bface - Send a business face.\n!fcat - Send a cat.\n!fhorse - Send a horse.\n!fpony - Send a pony.\n!fanime - Send a waifu.\n!fart - Send art.\n!froom - Send a room.\n!fvase - Send a vase.\n!fcvase - Send a chinese vase.\n!fdvase - Send a diverse vase.\n!fbvase - Send a beetle vase.\n!fdrvase - Send a dress vase.",
						},
						{
							name: "Have a issue or want a feature?",
							value: "Make a [issue](https://github.com/auralius-dev/FaceBot/issues/new)!",
						}
					],
					footer: {
						text: "ᶜ﹕"
					}
				}
			}, {
				name: "icon.webp",
				file: data
			});
		});
	}
});
//https://leovoel.github.io/embed-visualizer/ This was usful to understand how in the frick embeds work. Attaching files also sucks.
//https://github.com/auralius-dev/FaceBot/issues/new/choose
process.on("SIGINT", function() {	//If Ctrl+C is pressed say goodbye and exit.
	console.log(getTime(), "Goodbye!");
	process.exit();
});

bot.connect();	//Start the bot.
