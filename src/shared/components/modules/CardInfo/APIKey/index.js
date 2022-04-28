import { ReactComponent as Copy } from 'assets/icons/copy.svg';
import { ReactComponent as Key } from 'assets/icons/key.svg';
import React from 'react';
import { Button, Card, CardBody, CardHeader } from 'shared/components/partials';

const APIKeyInfo = () => {
  return (
    <Card className='max-w-4xl'>
      <CardHeader icon={<Key />} title='API Key'>
        <div className='flex gap-x-5'>
          <p>
            TX Limit: <b className='text-primary'>30</b>
          </p>
          <p>
            Daily Limit: <b className='text-primary'>5000</b>
          </p>
        </div>
      </CardHeader>
      <CardBody className='flex flex-col justify-center items-center px-36 py-20'>
        <div className='flex items-center gap-x-4 text-sm font-semibold'>
          <p>a1b2c33d4e5f6g7h8i9jakblc</p>
          <Copy />
        </div>
        <Button size='sm' rounded className='mt-3'>
          Replace Key
        </Button>
      </CardBody>
    </Card>
  );
};

APIKeyInfo.propTypes = {};

export default APIKeyInfo;
