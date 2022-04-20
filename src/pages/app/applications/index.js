import { ReactComponent as Clipboard } from 'assets/icons/clipboard.svg';
import React from 'react';
import { Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import ApplicationsTable from './table';

const Applications = (props) => {
  return (
    <>
      <Card className="h-full">
        <CardHeader icon={<Clipboard />} title='New Applications' />
        <CardBody>
          <div className='flex flex-col h-full'>
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
            <div className='flex-1 min-h-0'>
              <ApplicationsTable />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default Applications;
