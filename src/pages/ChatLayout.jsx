import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';


const ChatLayout = ({darkMode}) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    navigate('/login');
    return null;
  }


 

  const handleAddUser = () => {
    if (newUser.trim()) {
      setUsers((prevUsers) => [
        ...prevUsers,
        { id: Date.now(), name: newUser, avatar: '/api/placeholder/40/40' },
      ]);
      setNewUser('');
    }
  };

  const handleClick=(id,name)=>{
    console.log(`User with ID ${id} clicked`);

    navigate(`/chat/${id}/${name}`, {
      state: { userName: name }
    });
  }


  

  return (
    <div className={`flex h-screen w-4/5 ml-auto ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <aside className="w-1/4 border-r flex flex-col p-4">
        <h2 className="text-xl font-bold mb-4">Chats</h2>
        <div className="mb-4">
          <input
            type="text"
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
            placeholder="Add user name"
            className={`p-2 border rounded w-2/3 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}
          />
          <button
            onClick={handleAddUser}
            className="ml-2 p-2 bg-blue-500 text-white rounded"
          >
            Add User
          </button>
        </div>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-2 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} rounded shadow hover:bg-gray-100  hover:bg-gray-900  dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer`}
              onClick={()=>handleClick(user.id,user.name)}
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {'No recent messages'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </aside>
      <main className={`flex-1 p-4 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
        <div className="text-center flex flex-col items-center justify-center h-full">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={40} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Welcome to Let's Chat</h3>
          <p>Select a chat to start messaging with your friends</p>
        </div>
      </main>
    </div>
  );
};

export default ChatLayout;
