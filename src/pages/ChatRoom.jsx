import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatInput from '../components/Chat/ChatInput';
import MessageList from '../components/Chat/MessageList';
import { ArrowLeft, VideoIcon } from 'lucide-react';


const ChatRoom = ({ darkMode }) => {
  const { id, name } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/chatlayout');
  };

  return (
    <div className={`w-4/5  ml-auto flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="flex items-center p-4 border-b dark:border-gray-700">
        <div className="flex items-center">
        <button onClick={handleGoBack} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold">Chat Room - {name}</h2>
        </div>
        <div className="ml-auto flex items-center">
         
            <button className={`ml-4 p-2 text-black rounded ${darkMode ? 'bg-gray-900 text-white hover:bg-blue-100 hover:text-black ' : 'bg-gray-100 text-gray-900 hover:bg-gray-400 '}  transition-colors duration-300`}>
              <VideoIcon size={20} />
            </button>
        
        </div>
        

      </header>
      <main className="flex-1 overflow-y-auto">
        <MessageList chatId={id} />
      </main>
      <footer>
        <ChatInput chatId={id} />
      </footer>
    </div>
  );
};

export default ChatRoom;
