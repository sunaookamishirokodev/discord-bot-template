/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { model, Schema } = require("mongoose");
const prefix = require("../../secret/config.json").prefix;

module.exports = model(
  "GuildSchema",
  new Schema({
    guildId: {
      type: String,
      required: true,
      validate: {
        validator: (id) => {
          return /^\d+$/.test(id);
        },
        message: (props) => `${props.value} is not valid guild id`,
      },
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
      default: prefix,
    },
  })
);
