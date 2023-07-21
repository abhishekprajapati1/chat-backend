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
    console.log("user joined server")
    socket.on("send message", ({ sender, recipient, message }) => {
        console.log("see this", sender, recipient, message);

        
    })
})