import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue, off, remove} from 'firebase/database';
import { db } from '../../utils/firebase';
import MessageBubble from './MessageBubble';
import { Trash2 } from 'lucide-react';

const MessageList = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const messagesRef = ref(db, `chats/`);
  
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedMessages = Object.entries(data)
          .map(([id, message]) => ({
            id,
            ...message,
          }))
          .filter(
            (message) =>
              (message.senderId === user.uid && message.receiverId === chatId) || 
              (message.senderId === chatId && message.receiverId === user.uid)  
          )
          .sort((a, b) => a.timestamp - b.timestamp); 
  
        setMessages(formattedMessages);
      } else {
        setMessages([]);
      }
    });

    return () => off(messagesRef, 'value', unsubscribe);
  }, [chatId, user.uid]);
  

  const handleDeleteMsg = (messageId) => {
    const messageRef = ref(db, `chats/${messageId}`);
    remove(messageRef)
      .then(() => {
        console.log('Message deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
      });
  }
  return (
    <div className="p-4 space-y-4">
      {messages.map((message) => (
        <div key={message.id} className={`flex gap-2 ${message.senderId === user.uid ? ' justify-end' : 'justify-start'}`}>
          <MessageBubble
            key={message.id}
            message={message}
            isMe={message.senderId === user.uid}
          />
          <Trash2 size={14} onClick={() => handleDeleteMsg(message.id)}/>
        </div>
      ))}
      {messages.length === 0 && (
        <div className="text-center text-gray-500">
          No messages yet. Start the conversation!
        </div>
      )}
    </div>
  );
};
 
export default MessageList;
