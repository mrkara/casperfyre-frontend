import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getHistories } from 'stores/app/actions';
import styles from './style.module.scss';

const ApiLogsTable = React.forwardRef(({ outParams }, ref) => {
  const guid = getGuid();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiLogs();
  }, []);

  const fetchApiLogs = () => {
    dispatch(
      getHistories(
        {
          guid,
        },
        (res) => {
          appendData(res.detail || []);
          setHasMore(false);
        }
      )
    );
  };

  return (
    <Table.Wrapper className='max-h-[650px]'>
      <Table
        {...register}
        styles={styles}
        className='w-500'
        onLoadMore={fetchApiLogs}
        hasMore={hasMore}
        dataLength={data.length}
        // onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell>Request ID</Table.HeaderCell>
          <Table.HeaderCell>Timestamp</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>IP</Table.HeaderCell>
          <Table.HeaderCell>Recipient</Table.HeaderCell>
          <Table.HeaderCell>TXID</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {data.map((data, idx) => (
            <Table.BodyRow key={idx} className='py-4'>
              <Table.BodyCell>{data.userId}</Table.BodyCell>
              <Table.BodyCell>{data.requestId}</Table.BodyCell>
              <Table.BodyCell>{data.timestamp}</Table.BodyCell>
              <Table.BodyCell>{data.amount}</Table.BodyCell>
              <Table.BodyCell>{data.status}</Table.BodyCell>
              <Table.BodyCell>{data.ip}</Table.BodyCell>
              <Table.BodyCell>{data.recipient}</Table.BodyCell>
              <Table.BodyCell>{data.txId}</Table.BodyCell>
              <Table.BodyCell className='flex gap-x-2'>
                <button type='button' className='text-white bg-primary rounded-full text-[10px] px-6 text-center'>
                  View
                </button>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Table.Wrapper>
  );
});

export default ApiLogsTable;
