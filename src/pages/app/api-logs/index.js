import { ReactComponent as Buffer } from 'assets/icons/buffer.svg';
import React, { useState } from 'react';
import Toolbar from 'shared/components/modules/Toolbar';
import { Card, CardBody, CardHeader } from 'shared/components/partials';
import ApiLogsTable from './table';

const ApiLogs = (props) => {
  const [params, setParams] = useState();
  const handleToolbarChange = (params) => {
    setParams(params);
  };

  return (
    <Card>
      <CardHeader icon={<Buffer />} title='API Logs' />
      <CardBody>
        <Toolbar onChange={handleToolbarChange} />
        <ApiLogsTable externalParams={params} />
      </CardBody>
    </Card>
  );
};

export default ApiLogs;
