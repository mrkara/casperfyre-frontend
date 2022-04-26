import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as ListCheck } from 'assets/icons/list-check.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import AddIPModal from './modal/addIP';
import WhiteListedIPTable from './table';

const WhiteListedIP = (props) => {
  const [params, setParams] = useState();

  const { appendDialog } = useDialog();

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  const handleAddNewIP = () => {
    appendDialog(<AddIPModal />);
  };

  return (
    <Card>
      <CardHeader icon={<ListCheck />} title='Whitelisted IPs'>
        <div className='flex gap-x-1 items-center text-sm cursor-pointer' onClick={handleAddNewIP}>
          <AddIcon />
          Add New IP
        </div>
      </CardHeader>
      <CardBody>
        <div>
          <Toolbar onChange={handleToolbarChange} />
          <div className='flex-1 min-h-0'>
            <WhiteListedIPTable externalParams={params} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default WhiteListedIP;
