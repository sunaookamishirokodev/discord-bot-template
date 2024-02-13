/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { REST, Routes } = require("discord.js");
const config = require("../../secret/config.json");
const { log, isSnowflake } = require("../../utils/extensions");
const { global } = require("../..");

/**
 *
 * @param {import("discord.js").Client} client
 */
module.exports = async (client) => {
  const rest = new REST({ version: 10 }).setToken(process.env.BOT_TOKEN);

  try {
    if (!config.deploy.isGlobal) {
        if (!process.env.GUILD_ID || !isSnowflake(process.env.GUILD_ID)) {
          const errMsg = "Guild ID is missing. Please set it in ./secret/env or config file or disable in the config";
          log(errMsg, "err");
          throw Error(errMsg);
        }

        await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID || config.client.id, guildId), {
          body: global.commandArray,
        });

        log(`Successfully loaded application commands to guild id ${guildId}.`, "done");

    } else {
      await rest.put(Routes.applicationCommands(process.env.BOT_CLIENT_ID), {
        body: global.commandArray,
      });

      log("Successfully loaded application commands globally to Discord API.", "done");
    }
  } catch (error) {}
};
