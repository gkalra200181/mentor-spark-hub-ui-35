
import React from 'react';

interface TeamsIconProps {
  className?: string;
  size?: number;
}

export const TeamsIcon: React.FC<TeamsIconProps> = ({ className = "", size = 16 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M20.625 12.75V9.375C20.625 8.51016 19.9648 7.875 19.125 7.875H13.875V5.625C13.875 4.76016 13.2148 4.125 12.375 4.125H5.625C4.76016 4.125 4.125 4.76016 4.125 5.625V18.375C4.125 19.2398 4.76016 19.875 5.625 19.875H19.125C19.9648 19.875 20.625 19.2398 20.625 18.375V12.75Z"
        fill="currentColor"
      />
      <path
        d="M15.375 12C16.4105 12 17.25 11.1605 17.25 10.125C17.25 9.08947 16.4105 8.25 15.375 8.25C14.3395 8.25 13.5 9.08947 13.5 10.125C13.5 11.1605 14.3395 12 15.375 12Z"
        fill="white"
      />
      <path
        d="M9 13.5C10.0355 13.5 10.875 12.6605 10.875 11.625C10.875 10.5895 10.0355 9.75 9 9.75C7.96447 9.75 7.125 10.5895 7.125 11.625C7.125 12.6605 7.96447 13.5 9 13.5Z"
        fill="white"
      />
    </svg>
  );
};
