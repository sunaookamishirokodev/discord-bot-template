/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { global } = require("../../..");
const config = require("../../../secret/config.json");
const NodeCache = require("node-cache");
const { log } = require("../../../utils/extensions");

const cooldown = new NodeCache({
  checkperiod: 700,
  deleteOnExpire: true,
});

module.exports = {
  event: "interactionCreate",
  /**
   *
   * @param {import("discord.js").Client} client
   * @param {import('discord.js').Interaction} interaction
   * @returns
   */
  execute: async (client, interaction) => {
    if (!interaction.isCommand()) return;

    const command = global.slashCommands.get(interaction.commandName);

    if (!command) return;

    try {
      if (
        command.option?.privateCmd &&
        !config.privateUserArray.includes(interaction.user.id)
      ) {
        await interaction.reply({
          content: `${global.emojis.error} **|** You are not authorized to use this command!`,
          ephemeral: true,
        });

        return;
      }

      if (command.option?.cooldown) {
        const cooldownPeriod = cooldown.get(
          `${interaction.user.id}:${command.data.name}`
        );
        if (cooldownPeriod) {
          const cooldownEndAt = new Date(cooldownPeriod);
          return interaction.reply({
            content: `${time(cooldownEndAt, "R")}`,
            ephemeral: true,
          });
        } else {
          cooldown.set(
            `${interaction.user.id}:${command.data.name}`,
            Date.now() + command.option?.cooldown,
            command.option?.cooldown
          );
        }
      }

      command.execute(client, interaction);
    } catch (error) {
      log(error, "err");
    }
  },
};
