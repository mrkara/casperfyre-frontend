import classNames from 'classnames';
import React, { useState } from 'react';
import styles from './style.module.scss';

const ToggleSwitch = ({ checked = false }) => {
  const [isChecked, setChecked] = useState(checked);
  const handleChecked = () => {
    setChecked(!isChecked);
  };
  return (
    <label className={styles.btnSwitch} for='toggle-wrapper'>
      <input type='checkbox' id='toggle-wrapper' className='sr-only' checked={isChecked} />
      <div
        className={classNames(styles.toggle, {
          [styles.active]: isChecked,
        })}
        onClick={handleChecked}
      ></div>
    </label>
  );
};

export default ToggleSwitch;
