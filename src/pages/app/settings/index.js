import { ReactComponent as SettingsIcon } from 'assets/icons/settings-ic.svg';
import React, { useEffect } from 'react';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import ToggleSwitch from 'shared/components/partials/ToggleSwitch';
import withPageSetting from 'shared/HOC/withPageSetting';
import Admins from '../admins';
import styles from './style.module.scss';

const BREADCRUMB_DATA = [
  {
    label: 'Admin Settings',
    href: '/app/settings',
  },
  {
    label: 'General',
  },
];

const Settings = ({ config }) => {
  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
  }, []);

  return (
    <section className='section-settings'>
      <div className='section-body pt-4'>
        <Card className='max-w-4xl'>
          <CardHeader icon={<SettingsIcon />} title='Admin Settings' />
          <CardBody className='flex' noSpacing>
            <div className={styles.blockItem}>
              <p>Email</p>
              <p className='font-semibold'>useremail@gmail.com</p>
              <Button size='xs' className='rounded-full'>
                Update
              </Button>
            </div>
            <div className={styles.blockItem}>
              <p>Password</p>
              <p className='font-semibold'>******************</p>
              <Button size='xs' className='rounded-full'>
                Update
              </Button>
            </div>
            <div className={styles.blockItem}>
              <p>2fa Protection</p>
              <ToggleSwitch />
              <p className='text-primary font-semibold'>On</p>
            </div>
          </CardBody>
        </Card>
        <div className='section-content pt-12.5'>
          <Admins />
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(Settings);
