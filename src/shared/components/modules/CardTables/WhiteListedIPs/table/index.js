import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { STATUS } from 'shared/common/enum';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { useQuery } from 'shared/hooks/useQuery';
import { disableIP, enableIP, getIps } from 'stores/app/actions';
import styles from './style.module.scss';

const WhiteListedIPTable = React.forwardRef(({ externalParams }, ref) => {
  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData, setData } =
    useTable();

  const query = useQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams({ ...params, ...externalParams, guid: query.get('guid') }, (s) => {
        fetchIPs(s, 1);
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
        fetchIPs(s, 1);
      }
    );
  };

  const fetchIPs = (paramsValue = params, pageValue = page) => {
    dispatch(
      getIps(
        {
          ...paramsValue,
          page: pageValue,
        },
        (res) => {
          setHasMore(res.hasMore);
          appendData(res.detail || []);
          setPage((prev) => +prev + 1);
        }
      )
    );
  };

  const handleIPStatus = (status, ip, id) => {
    status === STATUS.ACTIVE
      ? dispatch(
          disableIP({ ip_id: `${ip}_${id}` }, (res) => {
            console.log('res');
          })
        )
      : dispatch(
          enableIP({ ip_id: `${ip}_${id}` }, (res) => {
            console.log('res');
          })
        );
  };

  return (
    <Table
      {...register}
      styles={styles}
      onLoadMore={fetchIPs}
      hasMore={hasMore}
      dataLength={data.length}
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell>User IP</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Date Added</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.ip}</Table.BodyCell>
            <Table.BodyCell>{data.active}</Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button
                size='sm'
                variant={data.active === STATUS.ACTIVE ? 'contained' : 'outline'}
                rounded
                onClick={() => handleIPStatus(data.active, data.ip, data.id)}
              >
                {data.active === STATUS.ACTIVE ? 'Disable' : 'Enable'}
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default WhiteListedIPTable;
