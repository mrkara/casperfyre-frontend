import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getAPIKeys } from 'stores/app/actions';
import styles from './style.module.scss';

const ApiKeysTable = React.forwardRef(({ outParams }, ref) => {
  const guid = getGuid();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = () => {
    dispatch(
      getAPIKeys(
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
    <Table
      {...register}
      styles={styles}
      maxHeight={480}
      className='w-400'
      onLoadMore={fetchApiKeys}
      hasMore={hasMore}
      dataLength={data.length}
      // onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell>
          <p>User ID</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Status</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Activation Date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Email</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Company</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Total API Calls</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Total CSPR Sent</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Action</p>
        </Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.userId}</Table.BodyCell>
            <Table.BodyCell>{data.status}</Table.BodyCell>
            <Table.BodyCell>{data.date}</Table.BodyCell>
            <Table.BodyCell>{data.email}</Table.BodyCell>
            <Table.BodyCell>{data.company}</Table.BodyCell>
            <Table.BodyCell>{data.totalApiCalls}</Table.BodyCell>
            <Table.BodyCell>{data.totalCSPRSent}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <button type='button' className='text-white bg-primary rounded-full text-xs px-7 py-1 text-center'>
                Approve
              </button>
              <button
                type='button'
                className='rounded-full text-xs px-7 py-1 text-center bg-white border border-primary text-primary'
              >
                Deny
              </button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default ApiKeysTable;
