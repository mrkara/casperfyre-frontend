import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import CheckBox from 'shared/components/partials/CheckBox';
import AllApiCallsTable from './table';

const AllApiCalls = (props) => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card>
      <CardHeader icon={<Buffer />} title='All API Calls'>
        <div className='flex gap-x-2 items-center'>
          <CheckBox />
          <p>Only Show Delivered</p>
        </div>
      </CardHeader>
      <CardBody>
        <div className='flex flex-col h-full'>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex-1 min-h-0'>
            <AllApiCallsTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AllApiCalls;
