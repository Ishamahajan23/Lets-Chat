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
      navigate('/login');
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
    <div className={`flex h-screen w-4/5 ml-auto ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <aside className="w-1/4 border-r flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">All Users</h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-2 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} rounded shadow hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer`}
              onClick={() => handleClick(user.id, user.name || user.email)}
            >
              <div className="flex-1">
                <h3 className="font-semibold">{user.name || user.email}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user.lastMessage ? `last: ${user.lastMessage.text}` : 'No messages yet'}</p>
              </div>
                
              <span className="text-xs text-gray-400">{new Date(user.lastMessage ? user.lastMessage.timestamp : Date.now()).toLocaleTimeString()}</span>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <div className="text-center flex flex-col items-center justify-center h-full">
          <h3 className="text-xl font-semibold mb-2">Welcome to Let's Chat</h3>
          <p>Select a user to start messaging</p>
        </div>
      </main>
    </div>
  );
};

export default ChatLayout;
