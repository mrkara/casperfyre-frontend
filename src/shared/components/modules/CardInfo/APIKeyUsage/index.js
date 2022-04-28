import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import React from 'react';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import Progress from 'shared/components/partials/Progress';
import styles from './style.module.scss';

const APIKeyUsage = (props) => {
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
      <CardBody className='flex' noSpacing>
        <div className={styles.blockItem}>
          <p>Tokens Today</p>
          <Progress percent={30} />
          <p>100/300</p>
        </div>
        <div className={styles.blockItem}>
          <p>Tokens Yesterday</p>
          <Progress percent={96} />
          <p>290/300</p>
        </div>
        <div className={styles.blockItem}>
          <p>Tokens This Month</p>
          <Progress percent={10} />
          <p>390/5000</p>
        </div>
        <div className={styles.blockItem}>
          <p>Tokens Last Month</p>
          <Progress percent={100} />
          <p>5000/5000</p>
        </div>
      </CardBody>
    </Card>
  );
};

APIKeyUsage.propTypes = {};

export default APIKeyUsage;
