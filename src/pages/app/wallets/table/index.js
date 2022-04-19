import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getWallets } from 'stores/app/actions';
import styles from './style.module.scss';

const WalletsTable = React.forwardRef(({ outParams }, ref) => {
  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();
  const dispatch = useDispatch();

  const guid = getGuid();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    dispatch(
      getWallets(
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
      onLoadMore={fetchApplications}
      hasMore={hasMore}
      dataLength={data.length}
      // onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell>User ID</Table.HeaderCell>
        <Table.HeaderCell>Active/Old</Table.HeaderCell>
        <Table.HeaderCell>Date Created</Table.HeaderCell>
        <Table.HeaderCell>Inactive Date</Table.HeaderCell>
        <Table.HeaderCell>Deposit Address</Table.HeaderCell>
        <Table.HeaderCell>CSPR Balance</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.userId}</Table.BodyCell>
            <Table.BodyCell>{data.active}</Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell>{data.inactive_at}</Table.BodyCell>
            <Table.BodyCell>{data.address}</Table.BodyCell>
            <Table.BodyCell>{data.balance}</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default WalletsTable;
