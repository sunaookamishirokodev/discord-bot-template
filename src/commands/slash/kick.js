const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("kick"),
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").Interaction} interaction
   */
  execute: async (client, interaction) => {},
};
