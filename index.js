/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { log } = require("./utils/extensions");
const {
  Client,
  GatewayIntentBits,
  Partials,
  ActivityType,
  Collection,
} = require("discord.js");
const { PrismaClient } = require("@prisma/client");

// Check bot token
require("dotenv").config();
if (!process.env.BOT_TOKEN) {
  return log(
    "No bot token found. Please edit /.env file and add your token",
    "err"
  );
}

// Config file
const config = require("./secret/config.json");

// Grab tokens and secret files
const debug = config.debug;
if (!debug) require("dd-trace").init();

// Check RAM
require("./utils/checkRam")();

// Init Prisma Client
const prisma = new PrismaClient();
log("Connected to prisma", "done");
async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

// Create new client
const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
  presence: {
    status: "idle",
    activities: [
      {
        name: "Coding with Shiroko",
        type: ActivityType.Custom,
        state: "Discord bot template",
      },
    ],
    afk: true,
  },
});

const global = {
  prefixCommands: new Collection(),
  slashCommands: new Collection(),
  aliases: new Collection(),
  commandArray: [],
  components: {
    buttons: new Collection(),
    selects: new Collection(),
    modals: new Collection(),
    autocompletes: new Collection(),
  },
  emojis: {
    error: "❌",
    success: "✔️",
    congratulations: "🎉",
    ping: "🏓",
    gift: "🎁",
  },
};

client.login(process.env.BOT_TOKEN).then((token) => {
  client.commandArray = [];

  require("./src/handlers/commands")();

  if (config.deploy) require("./src/handlers/deploy")(client);

  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
});

module.exports = {
  global,
  prisma,
};
