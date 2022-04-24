import { ReactComponent as Wallet } from 'assets/icons/wallet.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import WalletsTable from './table';

const Wallets = () => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card>
      <CardHeader icon={<Wallet />} title='Wallet History' />
      <CardBody>
        <div>
          <Toolbar onChange={handleToolbarChange}/>
          <div className='flex-1 min-h-0'>
            <WalletsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Wallets;
