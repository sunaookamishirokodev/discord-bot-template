/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { log } = require("./extensions");
const si = require("systeminformation");

module.exports = () => {
  setInterval(async () => {
    let mem = await si.mem();
    let ram = mem.available - mem.swaptotal;
    log("CURRENT RAM: " + ram / (1024 * 1024 * 1024) + "GB", "info");
  }, 5_000 * 60);
};
