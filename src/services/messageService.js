const Message = require("../models/message");

function messageService() {
    async function addMessage(message) {
        return Message.create(message);
    }
    //gets latest messages doesnt look very efficient
    async function getLatestMessages() {
        return Message.find().sort({
            _id: -1
        }).limit(10);
    }


    return {
        addMessage,
        getLatestMessages
    }
}
module.exports=messageService;