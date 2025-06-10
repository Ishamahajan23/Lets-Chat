import React from 'react';

function MessageBubble({ message, isOwn }) {
  return (
    <div style={{ textAlign: isOwn ? 'right' : 'left' }}>
      <p>{message}</p>
    </div>
  );
}

export default MessageBubble;
