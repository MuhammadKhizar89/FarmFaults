import React from 'react';

const DashboardSvg = ({ className, fill = "#181C1E", fillOpacity = 0.8 }) => {
  return (
    <svg
      width="42"
      height="39"
      viewBox="0 0 42 39"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M23.1147 12.7656V0H41.6064V12.7656H23.1147ZM0 21.276V0H18.4917V21.276H0ZM23.1147 38.2968V17.0208H41.6064V38.2968H23.1147ZM0 38.2968V25.5312H18.4917V38.2968H0Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </svg>
  );
};

export default DashboardSvg;
