/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { readdirSync } = require("fs");
const { global } = require("../../index");
const { log } = require("../../utils/extensions");

/**
 *
 * @param {import("discord.js").Client} client
 */
module.exports = (client) => {
  for (const dir of readdirSync(`./src/components/`)) {
    for (const file of readdirSync(`./src/components/${dir}`)) {
      const module = require(`../components/${dir}/${file}`);

      if (!module) return;

      if (!module.customId || !module.execute) {
        log(
          `Unable to load the component ${file} due to missing 'data#customId' or/and 'execute' properties.`,
          "warn"
        );

        continue;
      }

      switch (dir) {
        case "buttons":
          global.components.buttons.set(module.customId, module);
          break;

        case "selects":
          global.components.selects.set(module.customId, module);
          break;

        case "modals":
          global.components.modals.set(module.customId, module);
          break;

        case "autocompletes":
          global.components.autocompletes.set(module.customId, module);
          break;

        default:
          log(`Invalid component type: ${file}`, 'warn');
          break;
      }
    }
  }
};
