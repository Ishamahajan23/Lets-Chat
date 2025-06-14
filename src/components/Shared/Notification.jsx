import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue, off , remove} from 'firebase/database';
import { db } from '../../utils/firebase';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {Trash2} from 'lucide-react';


const Notification = ({ darkMode}) => {
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const notificationsRef = ref(db, `users/${user.uid}/notifications`);
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedNotifications = Object.entries(data).map(([id, notification]) => ({
          id,
          ...notification,
        }));
        setNotifications(formattedNotifications);
      } else {
        setNotifications([]);
      }
    });



    return () => off(notificationsRef, 'value', unsubscribe);
  }, [user]);
  const handleClick = (notification) => {
    navigate(`/chat/${notification.senderId}/${notification.senderName}`);
    console.log('Navigating to chat:', notification.chatId, notification.chatName);
    console.log('Notification clicked');
  };

    const handleClearAll = () => {
    const notificationsRef = ref(db, `users/${user.uid}/notifications`);
    remove(notificationsRef)
      .then(() => {
        console.log('All notifications cleared successfully');
        setNotifications([]);
      })
      .catch((error) => {
        console.error('Error clearing notifications:', error);
      });
  };

  return (
    <div className={`my-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-lg transition-colors duration-300 border-r ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-4 rounded`}>
      <div className='flex justify-between items-center mb-4'>
        <h3 className="text-lg font-bold mb-2 flex gap-2"> <span className='flex justify-center items-center'><Bell size={20} /></span> Notifications </h3>
        <p className="flex items-center gap-1 md:gap-2  text-sm  " onClick={handleClearAll}> <Trash2 size={17} /> Clear All </p>
      </div>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li key={notification.id} className="text-sm" onClick={() => handleClick(notification)}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
