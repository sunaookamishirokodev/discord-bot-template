/*
 * Discord Bot Template
 * Copyright (C) 2024 Sunaookami Shiroko
 * This software is licensed under MIT
 * For more information, see README.md and LICENSE
 */

const { log } = require("../../utils/extensions");

module.exports = async () => {
  await connect(process.env.MONGODB_URI).then(() => {
    log("MongoDB is connected to the atlas!", "done");
  });
};
