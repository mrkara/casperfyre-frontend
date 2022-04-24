import { ReactComponent as SettingsIcon } from 'assets/icons/settings-ic.svg';
import React, { useEffect } from 'react';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import ToggleSwitch from 'shared/components/partials/ToggleSwitch';
import styles from './style.module.scss';
import withPageSetting from 'shared/HOC/withPageSetting';

const BREADCRUMB_DATA = [
  {
    label: 'Admin Settings',
    href: '/app/settings',
  },
  {
    label: 'General',
  }
];

const Settings = ({ config }) => {
  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA)
  }, []);

  return (
    <section className='section-settings'>
      <div className='section-body pt-4 max-w-4xl'>
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
              <p className='text-primary font-semibold'>On</p>
            </div>
          </CardBody>
        </Card>
        <div className='section-content pt-12.5 flex flex-col gap-y-6'>
          <p className='text-sm font-semibold'>User Details</p>
          <div className='flex gap-y-3 flex-col'>
            {[
              {
                title: 'User ID',
                value: '1',
              },
              {
                title: 'Email',
                value: 'useremail@gmail.com',
              },
              {
                title: 'Activation Date',
                value: '2022-03-31 09:37:53',
              },
              {
                title: 'Daily CSPR Limit',
                value: '5000',
                onUpdate: () => console.log('update'),
              },
              {
                title: 'Per TX CSPR Limit',
                value: '500',
                onUpdate: () => console.log('update'),
              },
              {
                title: 'Receiving Wallet Address',
                value: '0x24232fdq32435gwefde',
              },
              {
                title: 'Total API calls',
                value: '1568',
              },
              {
                title: 'Total CSPR Sent',
                value: '206,915',
              },
            ].map((user) => (
              <div className='flex gap-x-3'>
                <p className='text-sm'>{user.title}: </p>
                <p className='text-sm font-semibold'>{user.value}</p>
                {user.onUpdate && (
                  <button className='text-xs bg-primary text-white rounded-full px-2 py' onClick={user.onUpdate}>
                    Update
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(Settings);
