import React from "react";

const ConversationItem = ({ sender, message }) => {
    return (
        <div className="conversation-item">
            <div className="sender">{sender}</div>
            <div className="message">{message}</div>
        </div>
    );
};

export default ConversationItem;
