import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { disableIP, enableIP, getIps } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const WhiteListedIPTable = React.forwardRef(({ externalParams }, ref) => {
  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData, setData } =
    useTable();

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams({ ...params, ...externalParams, guid: id }, (s) => {
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

  const handleIPStatus = (idx, status, ip, id) => {
    status === '1'
      ? dispatch(
          disableIP({ ip_id: `${ip}_${id}` }, () => {
            data[idx].active = '0';
            setData([...data]);
          })
        )
      : dispatch(
          enableIP({ ip_id: `${ip}_${id}` }, () => {
            data[idx].active = '1';
            setData([...data]);
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
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.ip}</Table.BodyCell>
            <Table.BodyCell className={data.active !== '1' && 'text-primary'}>
              {data.active === '1' ? 'Allowed' : 'Disabled'}
            </Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button
                size='sm'
                variant={data.active === '1' ? 'contained' : 'outline'}
                rounded
                onClick={() => handleIPStatus(idx, data.active, data.ip, data.id)}
              >
                {data.active === '1' ? 'Disable' : 'Enable'}
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default WhiteListedIPTable;
