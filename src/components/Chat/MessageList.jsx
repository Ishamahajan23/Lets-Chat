import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../../utils/firebase';
import MessageBubble from './MessageBubble';

const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const messagesRef = ref(db, `chats/${chatId}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMessages = Object.entries(data).map(([id, message]) => ({
          id,
          ...message,
        }));
        setMessages(formattedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => off(messagesRef, 'value', unsubscribe);
  }, [chatId]);

  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex  gap-2 ${message.senderId === user.uid ? 'justify-end' : 'justify-start '}`}>
          <p className="text-sm text-gray-500">{message.senderId === user.uid ? 'You' : message.senderId}</p>
          <MessageBubble
            key={message.id}
            message={message}
            isMe={message.senderId === user.uid}
          />
        </div>
        
      ))}
    </div>
  );
};

export default MessageList;
