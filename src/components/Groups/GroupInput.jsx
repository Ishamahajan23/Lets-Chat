import { useState } from 'react';
import { useSelector } from 'react-redux';
import EmojiPicker from 'emoji-picker-react';

const GroupInput = ({ groupId, groupUsers, onSendMessage }) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [taggedUser, setTaggedUser] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const handleSend = async () => {
    if (!text.trim()) return;

    const messageData = {
      text,
      senderId: user.uid,
      senderName: user.name || user.email,
      timestamp: Date.now(),
      taggedUser: taggedUser ? taggedUser.uid : null,
    };

    await onSendMessage(messageData); 

    setText('');
    setTaggedUser(null);
  };

  const handleEmojiSelect = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  const handleTagUser = (user) => {
    setTaggedUser(user);
    setText((prev) => `${prev}@${user.name || user.email} `);
  };

  return (
    <div className="flex flex-col p-2 border-t dark:border-gray-700 relative">
      <div className="flex items-center mb-2">
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
      <div className="flex flex-wrap gap-2">
        {(groupUsers || []).map((groupUser) => (
          <button
            key={groupUser.uid}
            onClick={() => handleTagUser(groupUser)}
            className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            @{groupUser.name || groupUser.email}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GroupInput;