import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../../utils/firebase';
import GroupInput from './GroupInput';
import { ArrowLeft } from 'lucide-react';

import MessageBubble from '../Chat/MessageBubble'; 
const GroupChat = ({ darkMode }) => {
  const { id, name } = useParams();
  const user = useSelector((state) => state.auth.user);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const messagesRef = ref(db, `groups/${id}/messages`);
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

    return () => unsubscribe();
  }, [id]);

  const handleSendMessage = async (messageData) => {
    const messagesRef = ref(db, `groups/${id}/messages`);
    await push(messagesRef, messageData);
  };

  const handleGoBack = () => {
    navigate('/groups');
  };

  return (
    <div className={`flex md:ml-80 h-screen w-full md:w-4/5 flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex items-center p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-center md:justify-start flex-1">
          <button onClick={handleGoBack} className="mr-10">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-xl font-bold truncate">Group Chat Room - {name}</h2>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col justify-start items-center">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isMe={message.senderId === user.uid}
          />
        ))}
      </main>
      <footer>
        <GroupInput groupId={id} groupUsers={[]} onSendMessage={handleSendMessage} />
      </footer>
    </div>
  );
};

export default GroupChat;

