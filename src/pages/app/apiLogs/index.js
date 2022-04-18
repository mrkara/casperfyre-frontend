import React from 'react';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import ApiLogsTable from './table';
import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';

const ApiLogs = (props) => {
  return (
    <Card>
      <CardHeader icon={<Buffer />} title='API Calls' />
      <CardBody>
        <div className='flex justify-between w-full pb-7'>
          <div className='flex items-center gap-x-1'>
            <p className='font-semibold'>Show</p>
            <select value={1} className='outline outline-1 px-1 text-base'>
              <option value={1}>10</option>
              <option value={2}>2</option>
            </select>
            <p className='font-semibold'>entries</p>
          </div>
          <div>
            <input className='bg-white w-60 py-1 px-4 text-base' placeholder='Search' />
          </div>
        </div>
        <div>
          <ApiLogsTable />
        </div>
      </CardBody>
    </Card>
  );
};

export default ApiLogs;
