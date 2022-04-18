import React, { Fragment } from 'react';
import { ReactComponent as Clipboard } from 'assets/icons/clipboard.svg';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import { ReactComponent as Settings } from 'assets/icons/settings.svg';

import MenuItem from './components/MenuItem';
import './style.module.scss';

const menuData = [
  [
    {
      component: <Clipboard />,
      text: 'Applications',
      href: '/app/applications',
    },
    {
      component: <Key />,
      text: 'API Keys',
      href: '/app/api-keys',
    },
    {
      component: <Buffer />,
      text: 'API Logs',
      href: '/app/api-logs',
    },
    {
      component: <Wallet />,
      text: 'Wallets',
      href: '/app/wallets',
    },
    {
      component: <Settings />,
      text: 'Settings',
      href: '/app/setting',
    },
  ],
];

const Sidebar = () => {
  return (
    <>
      <div className='mt-2.5 sidebar w-20 sm:w-60 transition-all duration-200 ease-in-out'>
        <ul className='pt-3 menu'>
          {menuData.map((group, index) => (
            <Fragment key={index}>
              {group.map((item, id) => (
                <MenuItem key={id} item={item} />
              ))}
              <div className={'divide'} />
            </Fragment>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
