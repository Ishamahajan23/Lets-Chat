import React from 'react';

const Avatar = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt || 'avatar'}
      className="w-10 h-10 rounded-full object-cover border dark:border-gray-600"
    />
  );
};

export default Avatar;
