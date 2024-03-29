/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const chalk = require("chalk");

/**
 * Logs a message with optional styling.
 *
 * @param {string} string - The message to log.
 * @param {'info' | 'err' | 'warn' | 'done' | undefined} style - The style of the log.
 */
const log = (string, style) => {
  const styles = {
    info: { prefix: chalk.blue("[INFO]"), logFunction: console.log },
    err: { prefix: chalk.red("[ERROR]"), logFunction: console.error },
    warn: {
      prefix: chalk.yellow("[WARNING]"),
      logFunction: console.warn,
    },
    done: {
      prefix: chalk.green("[SUCCESS]"),
      logFunction: console.log,
    },
  };

  const selectedStyle = styles[style] || { logFunction: console.log };
  selectedStyle.logFunction(
    `${selectedStyle.prefix || ""} ${string}`
  );
};

/**
 * Whenever a string is a valid snowflake (for Discord).

 * @param {string} id 
 * @returns {boolean}
 */
const isSnowflake = (id) => {
  return /^\d+$/.test(id);
};

module.exports = {
  log,
  isSnowflake,
};
