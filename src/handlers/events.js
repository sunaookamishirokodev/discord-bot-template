/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { readdirSync } = require("fs");
const { log } = require("../../utils/extensions");

/**
 *
 * @param {import("discord.js").Client} client
 */
module.exports = (client) => {
  for (const dir of readdirSync(`./src/events`)) {
    for (const file of readdirSync(`./src/events/${dir}`).filter((f) => f.endsWith(".js"))) {
      const module = require(`../events/${dir}/${file}`);

      if (!module) continue;

      if (!module.event || !module.execute) {
        log(`Unable to load event ${file} due to missing 'name' or/and 'run' properties.`, "warn");

        continue;
      }

      if (module?.once) {
        client.once(module.event, (...args) => module.execute(client, ...args));
      } else {
        client.on(module.event, (...args) => module.execute(client, ...args));
      }
    }
  }
};
