import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ref, onValue, off } from 'firebase/database';
import { db } from '../utils/firebase';

const ChatLayout = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }

    const usersRef = ref(db, 'users');
    const messagesRef = ref(db, 'chats');

    const unsubscribe = onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedUsers = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(formattedUsers.filter((user) => user.id !== currentUser.uid)); 
      }
    });
    onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val();
      if (messagesData) {
        const formattedMessages = Object.entries(messagesData).map(([id, message]) => ({
          id,
          ...message,
        }));
        setUsers((prevUsers) =>
          prevUsers.map((user) => ({
            ...user,
            lastMessage: formattedMessages
              .filter(
                (msg) =>
                  (msg.senderId === user.id && msg.receiverId === currentUser.uid) ||
                  (msg.senderId === currentUser.uid && msg.receiverId === user.id)
              )
              .sort((a, b) => b.timestamp - a.timestamp)[0] || null,
          }))
        );
      }
    }
    );

    return () => off(usersRef, 'value', unsubscribe);
  }, [currentUser, navigate]);

  const handleClick = (id, name) => {
    navigate(`/chat/${id}/${name}`);
  };
  if (!users.length) {
    return (
      <div className="flex h-screen w-4/5 ml-auto items-center justify-center">
        <p className="text-lg">No users available to chat</p>
      </div>
    );
  }
 
  return (
    <div className={`flex  md:ml-80 h-screen w-full md:w-4/5 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <aside className="w-full md:w-full flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4 text-center md:text-left">All Users</h2>
        <ul className="space-y-4 overflow-y-auto">
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex w-full items-center p-2 ${darkMode ? 'bg-gray-900 text-gray-100 border border-gray-100' : 'bg-gray-100 text-gray-900 border border-gray-200'} rounded shadow hover:bg-gray-100 dark:hover:bg-gray-500 dark:hover:text-white  cursor-pointer`}
              onClick={() => handleClick(user.id, user.name || user.email)}
            >
              <div className="flex-1">
                <h3 className="font-semibold truncate">{user.name || user.email}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.lastMessage ? `last: ${user.lastMessage.text}` : 'No messages yet'}</p>
              </div>
              <span className="text-xs text-gray-400">{new Date(user.lastMessage ? user.lastMessage.timestamp : Date.now()).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      </aside>
     
    </div>
  );
};

export default ChatLayout;
