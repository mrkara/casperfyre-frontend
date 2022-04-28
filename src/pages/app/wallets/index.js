import React from 'react';
import WalletsHistory from 'shared/components/modules/CardTables/WalletsHistory';
import { getGuid } from 'shared/core/services/auth';

const WalletsPage = () => {
  const guid = getGuid();

  return (
    <WalletsHistory guid={guid} className="h-full" />
  );
};

export default WalletsPage;
