import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getAPIKeys } from 'stores/app/actions';
import styles from './style.module.scss';

const ApiKeysTable = React.forwardRef(({ externalParams }, ref) => {
  const guid = getGuid();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

  const dispatch = useDispatch();

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams(
        { ...params, ...externalParams, guid },
        (s) => {
          fetchApiKeys(s, 1);
        }
      );
    }
  }, [externalParams]);

  const fetchApiKeys = (paramsValue = params, pageValue = page) => {
    dispatch(
      getAPIKeys(
        { ...paramsValue, page: pageValue },
        (res) => {
          setHasMore(res.hasMore);
          appendData(res.items || []);
          setPage((prev) => +prev + 1);
        }
      )
    );
  };

  return (
    <Table
      {...register}
      styles={styles}
      onLoadMore={fetchApiKeys}
      hasMore={hasMore}
      dataLength={data.length}
      // onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell>User ID</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Activation Date</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Company</Table.HeaderCell>
        <Table.HeaderCell>Total API Calls</Table.HeaderCell>
        <Table.HeaderCell>Total CSPR Sent</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className="table-body-card">
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
              <button type='button' className='text-white bg-primary rounded-full text-[10px] px-3 text-center'>
                Approve
              </button>
              <button
                type='button'
                className='rounded-full text-[10px] px-3 text-center bg-white border border-primary text-primary'
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
