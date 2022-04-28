import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import RecentApiCallsTable from './table';

const RecentApiCalls = (props) => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card>
      <CardHeader icon={<Buffer />} title='Recent API Calls' />
      <CardBody>
        <div className='flex flex-col h-full'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex-1 min-h-0'>
            <RecentApiCallsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default RecentApiCalls;
