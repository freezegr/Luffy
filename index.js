console.clear();
const Client = require("./Structures/Client.js");
const config = require("./Data/config.json");
const client = new Client();
require('dotenv').config();

client.start(process.env.TOKEN);