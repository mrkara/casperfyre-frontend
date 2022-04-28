import { ReactComponent as SettingsIcon } from 'assets/icons/settings-ic.svg';
import React, { useEffect } from 'react';
import AdminsCard from 'shared/components/modules/CardTables/Admins';
import UpdateEmailAdminModal from 'shared/components/modules/Modals/UpdateEmail';
import UpdatePasswordAdminModal from 'shared/components/modules/Modals/UpdatePasword';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import ToggleSwitch from 'shared/components/partials/ToggleSwitch';
import withPageSetting from 'shared/HOC/withPageSetting';
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
  const { appendDialog } = useDialog();

  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
  }, []);

  const handleShowModal = (type) => {
    switch (type) {
      case 'updateEmail':
        appendDialog(<UpdateEmailAdminModal />);
        break;

      case 'updatePassword':
        appendDialog(<UpdatePasswordAdminModal />);
        break;

      default:
        break;
    }
  };

  return (
    <section className='section-settings'>
      <div className='section-body pt-4'>
        <Card className='max-w-4xl'>
          <CardHeader icon={<SettingsIcon />} title='Admin Settings' />
          <CardBody className='flex' noSpacing>
            <div className={styles.blockItem}>
              <p>Email</p>
              <p className='font-semibold'>useremail@gmail.com</p>
              <Button size='xs' className='rounded-full' onClick={() => handleShowModal('updateEmail')}>
                Update
              </Button>
            </div>
            <div className={styles.blockItem}>
              <p>Password</p>
              <p className='font-semibold'>******************</p>
              <Button size='xs' className='rounded-full' onClick={() => handleShowModal('updatePassword')}>
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
          <AdminsCard />
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(Settings);
