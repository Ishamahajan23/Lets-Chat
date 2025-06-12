// src/components/Chat/ChatInput.jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { writeMessage } from '../../utils/firebase';
import EmojiPicker from 'emoji-picker-react';

const ChatInput = ({ chatId }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [taggedUser, setTaggedUser] = useState('');
  const user = useSelector((state) => state.auth.user);
 

  const handleSend = async () => {
    if (!text.trim()) return;
    await writeMessage(chatId, {
      text: taggedUser ? `@${taggedUser}: ${text}` : text,
      senderId: user.uid,
      senderName: user.email,
    });
    setText('');
    setTaggedUser('');
  };

  const handleEmojiSelect = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji); 
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex items-center p-2 border-t dark:border-gray-700 relative">
      <button
        onClick={() => setShowEmojiPicker((prev) => !prev)}
        className="p-2 bg-gray-300 dark:bg-gray-600 rounded mr-2"
      >
        😊
      </button>
      {showEmojiPicker && (
        <div className="absolute bottom-12 left-2 z-10">
          <EmojiPicker onEmojiClick={(emojiObject) => handleEmojiSelect(emojiObject)} />
        </div>
      )}
     
      <input
        className="flex-1 rounded-md p-2 border dark:bg-gray-500 dark:border-gray-600 dark:text-white"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        onClick={handleSend}
        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;