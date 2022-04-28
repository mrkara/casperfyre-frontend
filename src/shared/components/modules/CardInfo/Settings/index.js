import { ReactComponent as SettingsIcon } from 'assets/icons/settings-ic.svg';
import React from 'react';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import ToggleSwitch from 'shared/components/partials/ToggleSwitch';
import styles from './style.module.scss';

const SettingsInfo = (props) => {
  return (
    <Card>
      <CardHeader icon={<SettingsIcon />} title='Settings' />
      <CardBody isPadding={false} className='flex'>
        <div className={styles.blockItem}>
          <p>Email</p>
          <p className='font-semibold'>useremail@gmail.com</p>
          <div>
            <button className='text-xs bg-primary text-white rounded-full px-5 py-1'>Update</button>
          </div>
        </div>
        <div className={styles.blockItem}>
          <p>Password</p>
          <p className='font-semibold'>******************</p>
          <div>
            <button className='text-xs bg-primary text-white rounded-full px-5 py-1'>Update</button>
          </div>
          <div></div>
        </div>
        <div className={styles.blockItem}>
          <p>2fa Protection</p>
          <ToggleSwitch />
        </div>
      </CardBody>
    </Card>
  );
};

SettingsInfo.propTypes = {};

export default SettingsInfo;
