/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { ChannelType, time } = require("discord.js");
const config = require("../../../secret/config.json");
const { global } = require("../../../index");
const { log } = require("../../../utils/extensions");
const NodeCache = require("node-cache");

const cooldown = new NodeCache({
  checkperiod: 700,
  deleteOnExpire: true,
});

module.exports = {
  event: "messageCreate",
  /**
   *
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Message<true>} message
   * @returns
   */
  execute: async (client, message) => {
    if (
      message.author.bot ||
      message.channel.type === ChannelType.DM ||
      message.channel.type === ChannelType.GroupDM
    )
      return;

    if (config.prefix) return;

    let prefix = config.prefix;

    if (!message.content.startsWith(prefix)) return;

    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const commandInput = args.shift().toLowerCase();

    if (!commandInput.length) return;

    let command =
      global.prefixCommands.get(commandInput) ||
      global.prefixCommands.get(global.aliases.get(commandInput));

    if (command) {
      try {
        // Check permissions
        if (
          command.data?.permissions &&
          !message.member.permissions.has(command.data?.permissions)
        ) {
          await message.reply(
            `${global.emojis.error} **|** You do not have the permission to use this command!`
          );

          return;
        }

        // Check private command
        if (
          command.data.privateCmd &&
          !config.privateUserArray.includes(message.author.id)
        ) {
          await message.reply(
            `${global.emojis.error} **|** You are not authorized to use this command!`
          );

          return;
        }

        if (command.data?.nsfw && !message.channel.nsfw) {
          await message.reply(
            `${global.emojis.error} **|** The current channel is not a NSFW channel!`
          );

          return;
        }

        if (command.data?.cooldown) {
          const cooldownPeriod = cooldown.get(
            `${message.author.id}:${commandInput}`
          );
          if (cooldownPeriod) {
            const cooldownEndAt = new Date(cooldownPeriod);
            return message.reply(`${time(cooldownEndAt, "R")}`);
          } else {
            cooldown.set(
              `${message.author.id}:${commandInput}`,
              Date.now() + command.data?.cooldown,
              command.data?.cooldown
            );
          }
        }

        command.execute(client, message, args);
      } catch (error) {
        log(error, "err");
      }
    }
  },
};
