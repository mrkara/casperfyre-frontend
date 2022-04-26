import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import WalletsHistoryTable from './table';

const WalletsHistory = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card>
      <CardHeader icon={<Wallet />} title='Wallet History' />
      <CardBody>
        <div>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex-1 min-h-0'>
            <WalletsHistoryTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WalletsHistory;
