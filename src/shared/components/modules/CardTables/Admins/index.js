import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as AdminsIcon } from 'assets/icons/admins.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import AddAdminModal from './modal/add';
import AdminsTable from './table';

const Admins = () => {
  const [params, setParams] = useState();

  const { appendDialog } = useDialog();

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  const handleAddAdmin = () => {
    appendDialog(<AddAdminModal />);
  };

  return (
    <Card className='max-h-120'>
      <CardHeader icon={<AdminsIcon />} title='Admins'>
        <div className='flex gap-x-1 items-center text-sm cursor-pointer' onClick={handleAddAdmin}>
          <AddIcon />
          Add New Admin
        </div>
      </CardHeader>
      <CardBody>
        <Toolbar onChange={handleToolbarChange} />
        <AdminsTable externalParams={params} />
      </CardBody>
    </Card>
  );
};

export default Admins;
