import WalletsHistory from 'shared/components/modules/CardTables/WalletsHistory';
import WhiteListedIP from 'shared/components/modules/CardTables/WhiteListedIPs';
import ApiCalls from 'shared/components/modules/CardTables/ApiCalls';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import withPageSetting from 'shared/HOC/withPageSetting';
import { useQuery } from 'shared/hooks/useQuery';
import { disableAPIKey, enableAPIKey, getAPIKey } from 'stores/app/actions';
import ChangeWalletModal from 'shared/components/modules/Modals/ChangeWallet';
import ReplaceKeyModal from 'shared/components/modules/Modals/ReplaceKey';
import ResetPasswordModal from 'shared/components/modules/Modals/ResetPassword';
import StatusKeyModal from 'shared/components/modules/Modals/StatusKey';
import UpdateDailyCSPRLimitModal from 'shared/components/modules/Modals/UpdateDailyLimit';
import UpdateTXLimitModal from 'shared/components/modules/Modals/UpdateTxLimit';

const BREADCRUMB_DATA = [
  {
    label: 'API Keys',
    href: '/app/api-keys',
  },
  {
    label: 'Detail View',
  },
];

const ApiKeysDetail = ({ config }) => {
  const query = useQuery();

  const [apiKey, setApiKey] = useState();

  const dispatch = useDispatch();
  const { appendDialog } = useDialog();

  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
  }, []);

  useEffect(() => {
    fetchAPIKey(query.get('api_key_id'), query.get('guid'));
  }, []);

  const fetchAPIKey = (api_key_id, guid) => {
    dispatch(
      getAPIKey(
        {
          api_key_id,
          guid,
        },
        (res) => {
          setApiKey(res.detail || {});
        },
        (err) => {}
      )
    );
  };

  const generalActions = [
    {
      type: 'resetPassword',
      text: 'Reset Portal Password',
    },
    {
      type: 'keyStatus',
      text: 'Disable Key',
    },
    {
      type: 'replaceKey',
      text: 'Replace Key',
    },
    {
      type: 'changeWallet',
      text: 'Change Wallet',
    },
  ];

  const user = [
    {
      title: 'User ID',
      key: 'user_id',
    },
    {
      title: 'Email',
      key: 'email',
    },
    {
      title: 'Activation Date',
      key: 'created_at',
    },
    {
      title: 'Daily CSPR Limit',
      key: 'daily_limit',
      onUpdate: () => handleActions('updateDailyCSPRLimit'),
    },
    {
      title: 'Per TX CSPR Limit',
      key: 'tx_limit',
      onUpdate: () => handleActions('updatePerTXCSPRLimit'),
    },
    {
      title: 'Receiving Wallet Address',
      key: 'address',
    },
    {
      title: 'Total API calls',
      key: 'total_calls',
    },
    {
      title: 'Total CSPR Sent',
      key: 'total_cspr_sent',
    },
  ];

  const handleDisableAPIKey = (enable) => {
    enable
      ? dispatch(
          disableAPIKey(
            {
              api_key_id: query.get('api_key_id'),
            },
            (res) => {
              appendDialog(<StatusKeyModal disabled />);
            }
          )
        )
      : dispatch(
          enableAPIKey(
            {
              api_key_id: query.get('api_key_id'),
            },
            (res) => {
              appendDialog(<StatusKeyModal />);
            }
          )
        );
  };

  const handleActions = (type) => {
    switch (type) {
      case 'resetPassword':
        appendDialog(<ResetPasswordModal />);
        break;
      case 'keyStatus':
        const enable = false; // TODO: must update
        handleDisableAPIKey(enable);

        break;
      case 'replaceKey':
        appendDialog(<ReplaceKeyModal />);
        break;
      case 'updateDailyCSPRLimit':
        appendDialog(<UpdateDailyCSPRLimitModal />);
        break;
      case 'updatePerTXCSPRLimit':
        appendDialog(<UpdateTXLimitModal />);
        break;
      case 'changeWallet':
        appendDialog(<ChangeWalletModal />);
        break;
      default:
        break;
    }
  };

  return (
    <section className='section-api-keys-detail'>
      <div className='section-body pt-6'>
        <p className='section-title text-sm font-semibold'>General Actions</p>
        <div className='button-actions flex gap-x-5 pt-7.5'>
          {generalActions.map((action, index) => (
            <Button key={index} size='sm' rounded className='w-48 h-8' onClick={() => handleActions(action.type)}>
              {action.text}
            </Button>
          ))}
        </div>
        <div className='section-content pt-12.5 flex flex-col gap-y-6'>
          <p className='text-sm font-semibold'>User Details</p>
          <div className='flex gap-y-3 flex-col'>
            {user.map((user, index) => (
              <div key={index} className='flex gap-x-3'>
                <p className='text-sm'>{user.title}: </p>
                <p className='text-sm font-semibold'>{apiKey && apiKey[user.key]}</p>
                {user.onUpdate && (
                  <Button size='xs' className='rounded-full' onClick={user.onUpdate}>
                    Update
                  </Button>
                )}
              </div>
            ))}
          </div>
          <WhiteListedIP />
          <ApiCalls />
          <WalletsHistory />
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(ApiKeysDetail);
