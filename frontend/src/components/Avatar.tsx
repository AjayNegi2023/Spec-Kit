import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  name?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12'
};

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar',
  size = 'md',
  name
}) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (src) {
    return (
      <img 
        src={src}
        alt={alt}
        className={`rounded-full object-cover ${sizeClasses[size]}`}
      />
    );
  }

  return (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center ${sizeClasses[size]}`}>
      <span className="text-gray-600 font-medium">
        {name ? getInitials(name) : '?'}
      </span>
    </div>
  );
};

export default Avatar;