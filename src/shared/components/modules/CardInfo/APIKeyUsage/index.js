import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import Progress from 'shared/components/partials/Progress';
import { getUserUsage } from 'stores/api/user/actions';
import styles from './style.module.scss';

const APIKeyUsage = () => {
  const [data, setData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserUsage(null, (res) => {
      setData(res.detail);
    }));
  }, []);

  const calcPercent = (top, bot) => {
    if (!top || !bot) return 0;
    return (top / bot) * 100;
  }

  return (
    <Card>
      <CardHeader icon={<Key />} title='API Key Useage'>
        <div className='flex gap-x-2 items-center'>
          <p>
            <b>My Key</b>: a1b2c33d4e5f6g7h8i9jakblc
          </p>
          <Copy />
        </div>
      </CardHeader>
      <CardBody noSpacing>
        <div className='flex'>
          <div className={styles.blockItem}>
            <p>Tokens Today</p>
            <Progress percent={calcPercent(data?.usage_today, data?.usage_today_total)} />
            <p>{data?.usage_today}/{data?.usage_today_total}</p>
          </div>
          <div className={styles.blockItem}>
            <p>Tokens Yesterday</p>
            <Progress percent={calcPercent(data?.usage_yesterday, data?.usage_yesterday_total)} />
            <p>{data?.usage_yesterday}/{data?.usage_yesterday_total}</p>
          </div>
          <div className={styles.blockItem}>
            <p>Tokens This Month</p>
            <Progress percent={calcPercent(data?.usage_thismonth, data?.usage_thismonth_total)} />
            <p>{data?.usage_thismonth}/{data?.usage_thismonth_total}</p>
          </div>
          <div className={styles.blockItem}>
            <p>Tokens Last Month</p>
            <Progress percent={calcPercent(data?.usage_lastmonth, data?.usage_lastmonth_total)} />
            <p>{data?.usage_lastmonth}/{data?.usage_lastmonth_total}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

APIKeyUsage.propTypes = {};

export default APIKeyUsage;
