import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GeneralSettings from 'shared/components/modules/CardInfo/GeneralSettings';
import withPageSetting from 'shared/HOC/withPageSetting';
import { fetchUserInfo } from 'stores/auth/actions';

const BREADCRUMB_DATA = [
  {
    label: 'User Settings',
    href: '/app/settings',
  },
  {
    label: 'General',
  },
];

const SettingsPage = ({ config }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer?.user);

  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
    dispatch(fetchUserInfo());
  }, []);

  return (
    <section className='section-settings'>
      <div className='section-body pt-4 max-w-4xl'>
        <GeneralSettings />
        <div className='section-content pt-12.5 flex flex-col gap-y-6'>
          <p className='text-sm font-semibold'>User Details</p>
          <div className='flex gap-y-3 flex-col'>
            {[
              {
                title: 'User ID',
                value: user?.guid,
              },
              {
                title: 'Email',
                value: user?.email,
              },
              {
                title: 'Activation Date',
                value: user?.created_at,
              },
              {
                title: 'Daily CSPR Limit',
                value: '',
                onUpdate: () => console.log('update'),
              },
              {
                title: 'Per TX CSPR Limit',
                value: '',
                onUpdate: () => console.log('update'),
              },
              {
                title: 'Receiving Wallet Address',
                value: '',
              },
              {
                title: 'Total API calls',
                value: '',
              },
              {
                title: 'Total CSPR Sent',
                value: '',
              },
            ].map((user, index) => (
              <div key={index} className='flex gap-x-3'>
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

export default withPageSetting(SettingsPage);
