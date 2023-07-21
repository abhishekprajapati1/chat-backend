const express = require("express");
const appRouter = express.Router();
const chatsRouter = require("./chats.router.js");

appRouter.use("/chats", chatsRouter)

module.exports = appRouter;