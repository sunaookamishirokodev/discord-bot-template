/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

module.exports = {
  event: "ready",
  once: true,
  /**
     * 
     * @param {import('discord.js').Client} _ 
     * @param {import('discord.js').Client<true>} client 
     * @returns 
     */
  execute: (_, client) => {

    log('Logged in as: ' + client.user.tag, 'done');

  }
}