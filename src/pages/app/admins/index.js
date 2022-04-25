import { ReactComponent as AddIcon } from 'assets/icons/add.svg';
import { ReactComponent as AdminsIcon } from 'assets/icons/admins.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader, Input } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import AddAdminModal from './modal/add';
import UpdateEmailAdminModal from './modal/update';
import VerifyAdminModal from './modal/verify';
import AdminsTable from './table';

const Admins = (props) => {
  const [params, setParams] = useState();

  const { appendDialog } = useDialog();

  const handleToolbarChange = (params) => {
    setParams(params);
  };

  const handleAddAdmin = () => {
    // TODO: Need update as requirement
    appendDialog(<AddAdminModal />);
    // appendDialog(<VerifyAdminModal complete />);
    // appendDialog(<UpdateEmailAdminModal />);
  };

  return (
    <Card>
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
