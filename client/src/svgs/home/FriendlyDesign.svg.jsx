

import React from 'react';

const FriendlyDesign = ({ className, fill = "#181C1E", fillOpacity = 0.8 }) => {
  return (
    <svg
      width="34"
      height="42"
      viewBox="0 0 34 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M29.9466 0H11.0051C8.92148 0 7.21674 1.70208 7.21674 3.7824V9.45601H11.0051V5.6736H29.9466V35.9328H11.0051V32.1504H7.21674V37.824C7.21674 39.9043 8.92148 41.6064 11.0051 41.6064H29.9466C32.0302 41.6064 33.7349 39.9043 33.7349 37.824V3.7824C33.7349 1.70208 32.0302 0 29.9466 0ZM7.23568 23.5833L2.40558 18.7607L0 21.1625L7.21674 28.368L20.8357 14.7703L18.4301 12.3685L7.23568 23.5833Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default FriendlyDesign;
