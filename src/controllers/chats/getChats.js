const chats = require("../../chats");


const getChats = async (req, res) => {
    const user_id = req.params.id;
    try {

        let chatsToSend = [];
        let userData;

        chats.forEach(chat => {
            let isValidChat = chat.users.find(user => user.user_id === user_id);
            if (isValidChat) {
                userData = isValidChat;
                let user = chat.users.find(user => user.user_id !== user_id);
                chatsToSend.push({
                    ...chat,
                    friend: user,
                })
            }
        });

        res.status(200).json({ success: true, data: { user: userData, data: chatsToSend } });
    } catch (error) {

    }
}

module.exports = getChats;