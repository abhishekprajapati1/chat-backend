const express = require("express");
const chatsRouter = express.Router();


const getChats = require("../controllers/chats/getChats");


chatsRouter.get("", getChats);
chatsRouter.get("/users/:id", getChats);


module.exports = chatsRouter;