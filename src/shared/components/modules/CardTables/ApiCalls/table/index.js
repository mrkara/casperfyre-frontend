import React from 'react';
import { useDispatch } from 'react-redux';
import APICallsDetailModal from 'shared/components/modules/Modals/APICallsDetail';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { HistoryStatus } from 'shared/core/directive';
import { getHistories } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const ApiCallsTable = React.forwardRef(({ externalParams }, ref) => {
  const dispatch = useDispatch();
  const { appendDialog } = useDialog();

  const api = (params, resolve, reject) => {
    dispatch(getHistories(params, resolve, reject));
  };

  const { data, fetchApi, register, hasMore, handleSort } = useTable({ externalParams, api });

  const handleViewAPIDetail = (data) => {
    appendDialog(<APICallsDetailModal data={data} />);
  };

  return (
    <Table
      {...register}
      styles={styles}
      onLoadMore={fetchApi}
      hasMore={hasMore}
      dataLength={data.length}
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell sortKey='requestId'>Request ID</Table.HeaderCell>
        <Table.HeaderCell>Timestamp</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>IP</Table.HeaderCell>
        <Table.HeaderCell>Recipient</Table.HeaderCell>
        <Table.HeaderCell>TXID</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((item, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{item.id}</Table.BodyCell>
            <Table.BodyCell>{item.created_at}</Table.BodyCell>
            <Table.BodyCell>{item.amount}</Table.BodyCell>
            <Table.BodyCell>
              <HistoryStatus data={item} />
            </Table.BodyCell>
            <Table.BodyCell>{item.ip}</Table.BodyCell>
            <Table.BodyCell className='break-words'>{item.address}</Table.BodyCell>
            <Table.BodyCell className='break-words'>{item.deploy_hash}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button size='sm' rounded onClick={() => handleViewAPIDetail(item)}>
                View
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default ApiCallsTable;
