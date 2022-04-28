import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { useQuery } from 'shared/hooks/useQuery';
import { getHistories } from 'stores/app/actions';
import styles from './style.module.scss';

const AllApiCallsTable = React.forwardRef(({ externalParams }, ref) => {
  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

  const query = useQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams({ ...params, ...externalParams, guid: query.get('guid') }, (s) => {
        fetchApiCalls(s, 1);
      });
    }
  }, [externalParams]);

  const handleSort = async (key, direction) => {
    setParams(
      {
        ...params,
        sort_key: key,
        sort_direction: direction,
      },
      (s) => {
        resetData();
        fetchApiCalls(s, 1);
      }
    );
  };

  const fetchApiCalls = (paramsValue = params, pageValue = page) => {
    dispatch(
      getHistories(
        { ...paramsValue, page: pageValue },
        (res) => {
          setHasMore(res.hasMore);
          appendData(res.items || []);
          setPage((prev) => +prev + 1);
        },
        (error) => {
          setHasMore(false);
        }
      )
    );
  };

  return (
    <Table
      {...register}
      styles={styles}
      className='w-400'
      onLoadMore={fetchApiCalls}
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
              <Button size='sm' rounded>
                View
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default AllApiCallsTable;
