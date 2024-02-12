/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { readdirSync } = require("fs");
const { log } = require("../../utils/extensions");
const { global } = require("../..");

/**
 *
 * @param {import("discord.js").Client} client
 */
module.exports = (client) => {
  for (const type of readdirSync(`./src/commands/`)) {
    for (const dir of readdirSync(`./src/commands/${type}/`)) {
      for (const file of readdirSync(
        `./src/commands/${type}/${dir}`
      )) {
        const module = require(`../commands/${type}/${dir}/${file}`);

        if (!module) continue;

        switch (type) {
          case "prefix": {
            if (!module.data?.name || !module.execute) {
              log(
                "Unable to load the command " +
                  file +
                  " due to missing 'data#name' or/and 'execute' properties.",
                "warn"
              );

              continue;
            }

            global.prefixCommands.set(module.data.name, module);

            if (
              module.data.aliases &&
              Array.isArray(module.data.aliases)
            ) {
              module.data.aliases.forEach((alias) => {
                global.aliases.set(alias, module.data.name);
              });
            }
            module.data.category = dir;

            break;
          }
          case "slash": {
            if (!module.data?.name || !module.execute) {
              log(
                "Unable to load the command " +
                  file +
                  " due to missing 'data#name' or/and 'execute' properties.",
                "warn"
              );

              continue;
            }

            global.slashCommands.set(module.data.name, module);
            client.commandArray.push(module.data);
            module.option.category = dir;

            break;
          }
          default: {
            log(`Invalid type of command: '${type}'`);
          }
        }
      }
    }
  }
};
