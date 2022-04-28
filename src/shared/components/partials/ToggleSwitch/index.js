import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './style.module.scss';

const ToggleSwitch = ({ checked = false }) => {
  const [isChecked, setChecked] = useState(checked);
  const handleChecked = () => {
    setChecked(!isChecked);
  };
  return (
    <div>
      <label className={styles.btnSwitch} for='toggle-wrapper'>
        <input type='checkbox' id='toggle-wrapper' className='sr-only' checked={isChecked} />
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
