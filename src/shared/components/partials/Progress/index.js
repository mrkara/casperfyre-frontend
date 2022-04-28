import classNames from 'classnames';
import React from 'react';

const Progress = ({ percent, className }) => {
  return (
    <div className={classNames('w-full bg-gray-200 rounded-full h-2.5', className)}>
      <div className='bg-primary h-2.5 rounded-full' style={{ width: `${percent}%` }}></div>
    </div>
  );
};

Progress.propTypes = {};

export default Progress;
