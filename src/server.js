const express = require('express');
const prisma = require("../helpers/prisma.js");
const app = express();
const cors = require('cors');
const appRouter = require("./routers/index.js");


require('dotenv').config();

app.use(cors({
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
    origin: ["http://localhost:3001", "http://localhost:3000", 'http://192.168.1.4:3000'],
    credentials: true,
}));



app.use("/api", prisma, appRouter);

const PORT = process.env.PORT || 4000;

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: [
            'http://localhost:3000',
            'http://192.168.1.4:3000',
            'http://192.168.1.4:3000/'
        ]
    }
});

io.on("connection", (socket) => {
    socket.on("setup", (userData) => {
        socket.join(userData?.user_id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("user joined room", room);
    })


    socket.on("new message", (newMessageRecieved) => {
        let chat = newMessageRecieved?.chat;
        if (!chat?.users) return console.log("chat.users is not defined");
        chat.users.forEach(user => {
            if (user.user_id === newMessageRecieved.sender.user_id) return;
            socket.in(user.user_id).emit("message received", newMessageRecieved);
        })

        // here we can store that chat in database.
    })
})