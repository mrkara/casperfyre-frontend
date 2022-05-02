import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './style.module.scss';

const ToggleSwitch = ({ checked = false, disableChange = false, ...other }) => {
  const [isChecked, setChecked] = useState(checked);
  const handleChecked = () => {
    !disableChange && setChecked(!isChecked);
  };
  return (
    <div>
      <label className={styles.btnSwitch} htmlfor='toggle-wrapper'>
        <input {...other} type='checkbox' id='toggle-wrapper' className='sr-only' checked={isChecked} />
        <div
          className={classNames(styles.toggle, {
            [styles.active]: isChecked,
          })}
          onClick={handleChecked}
        ></div>
      </label>
      <p className='mt-3 text-primary font-semibold'>{isChecked ? 'On' : 'Off'}</p>
    </div>
  );
};

export default ToggleSwitch;
