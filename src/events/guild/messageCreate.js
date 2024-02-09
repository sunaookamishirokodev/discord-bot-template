/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { ChannelType } = require("discord.js");
const config = require("../../../secret/config.json");

const cooldown = new Map();

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

    if (config.mongodb) {
      try {
        let guildDoc;
      } catch (err) {}
    }
  },
};
