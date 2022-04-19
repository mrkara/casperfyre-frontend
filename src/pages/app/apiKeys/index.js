import React from 'react';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import { Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import ApiKeysTable from './table';

const ApiKeys = (props) => {
  return (
    <Card>
      <CardHeader icon={<Key />} title='API KeyHolders' />
      <CardBody>
        <div className='flex justify-between w-full pb-7'>
          <div className='flex items-center gap-x-1'>
            <p className='font-semibold text-[10px]'>Show</p>
            <select className='outline outline-1 px-1 font-semibold text-[10px]'>
              <option value={1}>10</option>
              <option value={2}>2</option>
            </select>
            <p className='font-semibold text-[10px]'>entries</p>
          </div>
          <div>
            <Input className='bg-white w-40 py-0 px-1 text-[10px]' placeholder='Search' />
          </div>
        </div>
        <div>
          <ApiKeysTable />
        </div>
      </CardBody>
    </Card>
  );
};

export default ApiKeys;
