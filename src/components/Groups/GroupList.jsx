import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ref, onValue, push } from 'firebase/database';
import { db } from '../../utils/firebase';
import { useNavigate } from 'react-router-dom';

const GroupList = ({ darkMode }) => {
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showSelectedUsers, setShowSelectedUsers] = useState(false); 
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const groupsRef = ref(db, 'groups');
    const usersRef = ref(db, 'users');

    onValue(groupsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedGroups = Object.entries(data).map(([id, group]) => ({
          id,
          ...group,
        }));
        setGroups(formattedGroups);
      }
    });

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const formattedUsers = Object.entries(data).map(([id, user]) => ({
          id,
          ...user,
        }));
        setUsers(formattedUsers.filter((u) => u.id !== user.uid));
      }
    });
  }, [user.uid]);

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length === 0) return;

    const groupRef = ref(db, 'groups');
    const newGroup = {
      name: groupName,
      members: [user.uid, ...selectedUsers],
      createdBy: user.uid,
      createdAt: Date.now(),
    };

    await push(groupRef, newGroup);
    setGroupName('');
    setSelectedUsers([]);
    console.log('Group created successfully');
  };

  const handleGroupClick = (groupId, groupName) => {
    navigate(`/group/${groupId}/${groupName}`);
  };

  return (
    <div className={`flex flex-col md:ml-80 mt-5 md:mt-0 h-screen w-full md:w-4/5 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} transition-colors duration-300} space-y-4 overflow-y-auto   p-2`}>
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">Groups</h2>
      <div className="mb-4 flex  flex-col gap-2 justify-center">
        <div className="flex justify-center gap-2 ">
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        />
        <select
          multiple
          value={selectedUsers}
          onChange={(e) =>
            setSelectedUsers(Array.from(e.target.selectedOptions, (option) => option.value))
          }
          className="p-2 border rounded w-full"
        >
          {users.map((u) => (
            <option
              key={u.id}
              value={u.id}
              style={{
                backgroundColor: selectedUsers.includes(u.id) ? '#ADD8E6' : 'transparent',
              }}
            >
              {u.name || u.email}
            </option>
          ))}
        </select>
        </div>
       
        <button
          onClick={() => setShowSelectedUsers(!showSelectedUsers)} 
          className="mt-2 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          {showSelectedUsers ? 'Hide Selected Users' : 'Show Selected Users'}
        </button>
        {showSelectedUsers && (
          <ul className="mt-2 border rounded p-2 bg-white text-black">
            {selectedUsers.length > 0 ? (
              selectedUsers.map((userId) => {
                const selectedUser = users.find((u) => u.id === userId); 
                return (
                  <li key={userId} className="p-1 border-b last:border-b-0">
                    {selectedUser?.name || selectedUser?.email}
                  </li>
                );
              })
            ) : (
              <li className="p-1 text-gray-500">No users selected</li>
            )}
          </ul>
        )}
        <button
          onClick={handleCreateGroup}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Group
        </button>
      </div>
      <ul className="space-y-4 overflow-y-auto flex-1 justify-start items-center p-2">
        {groups.map((group) => (
          <li
            key={group.id}
            className="p-2 border rounded cursor-pointer hover:bg-gray-200 hover:text-black"
            onClick={() => handleGroupClick(group.id, group.name)}
          >
            {group.name}
            <span className="text-sm text-gray-500 ml-2">
              Members: {group.members.length}
            </span>
            <span className="text-xs text-gray-400 ml-2 text-right">
              Created by: {group.createdBy === user.uid ? "" : user.name || user.email} at {new Date(group.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupList;