const chats = require("../../chats");


const getChats = async (req, res) => {
    const user_id = req.params.id;
    try {
        let users = chats.filter(ch => ch.user_id !== user_id);
        let user = chats.find(u => u.user_id === user_id)
        res.status(200).json({ success: true, data: users, user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, error });
    }
}

module.exports = getChats;