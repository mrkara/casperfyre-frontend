import Logo from 'assets/images/casper-logo.png';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { STATUS } from 'shared/common/enum';
import ApiCalls from 'shared/components/modules/CardTables/ApiCalls';
import WalletsHistory from 'shared/components/modules/CardTables/WalletsHistory';
import WhiteListedIP from 'shared/components/modules/CardTables/WhiteListedIPs';
import { useLoading } from 'shared/components/modules/Loading';
import ChangeWalletModal from 'shared/components/modules/Modals/ChangeWallet';
import ReplaceKeyModal from 'shared/components/modules/Modals/ReplaceKey';
import ResetPasswordModal from 'shared/components/modules/Modals/ResetPassword';
import StatusKeyModal from 'shared/components/modules/Modals/StatusKey';
import UpdateDailyCSPRLimitModal from 'shared/components/modules/Modals/UpdateDailyLimit';
import UpdateTXLimitModal from 'shared/components/modules/Modals/UpdateTxLimit';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import withPageSetting from 'shared/HOC/withPageSetting';
import { useQuery } from 'shared/hooks/useQuery';
import { disableAPIKey, enableAPIKey, getAPIKey } from 'stores/app/actions';

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
  const { setLoading } = useLoading();
  const query = useQuery();
  const { id } = useParams();
  const [apiKey, setApiKey] = useState();
  const dispatch = useDispatch();
  const { appendDialog } = useDialog();

  useEffect(() => {
    config.setBreadcrumb(BREADCRUMB_DATA);
  }, []);

  useEffect(() => {
    fetchAPIKey(query.get('guid'));
  }, []);

  const fetchAPIKey = (guid) => {
    setLoading(true);
    dispatch(
      getAPIKey(
        {
          api_key_id: id,
          guid,
        },
        (res) => {
          setApiKey(res.detail || {});
          setLoading(false);
        },
        (err) => {}
      )
    );
  };

  const user = [
    {
      title: 'User ID',
      key: 'guid',
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

  const updateApiKeyStatus = () => {
    apiKey.active = apiKey.active === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;
    setApiKey({...apiKey});
  }

  const handleChangeAPIKeyStatus = (disable) => {
    disable
      ? dispatch(
          enableAPIKey(
            {
              api_key_id: id,
            },
            (res) => {
              appendDialog(
                <StatusKeyModal
                  apiKey={apiKey} 
                  afterClosed={(e) => e ==='undo' && updateApiKeyStatus()} 
                />
              );
              updateApiKeyStatus();
            }
          )
        )
      : dispatch(
          disableAPIKey(
            {
              api_key_id: id,
            },
            (res) => {
              appendDialog(
                <StatusKeyModal
                  disabled
                  apiKey={apiKey} 
                  afterClosed={(e) => e ==='undo' && updateApiKeyStatus()} 
                />
              );
              updateApiKeyStatus();
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
        handleChangeAPIKeyStatus(apiKey.active === STATUS.INACTIVE);
        break;
      case 'replaceKey':
        appendDialog(<ReplaceKeyModal guid={apiKey.guid} />);
        break;
      case 'updateDailyCSPRLimit':
        appendDialog(<UpdateDailyCSPRLimitModal guid={apiKey.guid} />);
        break;
      case 'updatePerTXCSPRLimit':
        appendDialog(<UpdateTXLimitModal guid={apiKey.guid} />);
        break;
      case 'changeWallet':
        appendDialog(<ChangeWalletModal guid={apiKey.guid} />);
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
          {apiKey &&
            [
              {
                type: 'resetPassword',
                text: 'Reset Portal Password',
              },
              {
                type: 'keyStatus',
                text: apiKey.active === STATUS.INACTIVE ? 'Enable Key' : 'Disable Key',
                color: apiKey.active === STATUS.INACTIVE ? 'success' : 'primary',
              },
              {
                type: 'replaceKey',
                text: 'Replace Key',
              },
              {
                type: 'changeWallet',
                text: 'Change Wallet',
              },
            ].map((action, index) => (
              <Button
                key={index}
                size='sm'
                color={action.color}
                rounded
                className='w-48 h-8'
                onClick={() => handleActions(action.type)}
              >
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
                <p className='text-sm font-semibold flex'>
                  {user.key === 'total_cspr_sent' && <img className='ml-2 mr-1' src={Logo} alt='logo' />}
                  {apiKey && apiKey[user.key]}
                </p>
                {user.onUpdate && (
                  <Button size='xs' className='rounded-full' onClick={user.onUpdate}>
                    Update
                  </Button>
                )}
              </div>
            ))}
          </div>
          <WhiteListedIP className="max-h-120"/>
          <ApiCalls className="max-h-120"/>
          <WalletsHistory guid={query.get('guid')} className="max-h-120" />
        </div>
      </div>
    </section>
  );
};

export default withPageSetting(ApiKeysDetail);
