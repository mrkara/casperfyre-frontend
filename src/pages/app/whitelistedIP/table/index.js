import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getIps } from 'stores/app/actions';
import styles from './style.module.scss';

const WhiteListedIPTable = React.forwardRef(({ outParams }, ref) => {
  const guid = getGuid();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData, setData } =
    useTable();

  const dispatch = useDispatch();

  useEffect(() => {
    resetData();
    fetchApplications(1, params);
  }, []);

  const handleSort = async (key, direction) => {
    const newParams = {
      sort_key: key,
      sort_direction: direction,
    };
    setParams(newParams);
    resetData();
    // fetchData(1, newParams);
  };

  const fetchApplications = (pageValue = page, paramsValue = params) => {
    dispatch(
      getIps(
        {
          ...paramsValue,
          guid,
          offset: pageValue,
        },
        (res) => {
          setHasMore(res.hasMore);
          appendData(res.detail || []);
          setPage((prev) => +prev + 1);
        }
      )
    );
  };

  return (
    <Table.Wrapper className='max-h-[400px]'>
      <Table
        {...register}
        styles={styles}
        onLoadMore={fetchApplications}
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
                <button type='button' className='text-white bg-primary rounded-full text-[10px] px-3 text-center'>
                  Disable
                </button>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Table.Wrapper>
  );
});

export default WhiteListedIPTable;
