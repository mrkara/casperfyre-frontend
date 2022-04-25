import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getAdmins } from 'stores/app/actions';
import VerifyAdminModal from '../modal/verify';
import styles from './style.module.scss';

const AdminsTable = React.forwardRef(({ externalParams }, ref) => {
  const guid = getGuid();

  const { appendDialog } = useDialog();
  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAdmins();
  }, []);

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams({ ...params, ...externalParams, guid }, (s) => {
        fetchAdmins(s, 1);
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
        fetchAdmins(s, 1);
      }
    );
  };

  const fetchAdmins = (paramsValue = params, pageValue = page) => {
    //TODO: Update api
    dispatch(
      getAdmins(
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

  const handleAction = () => {
    appendDialog(<VerifyAdminModal />);
  };

  return (
    <Table.Wrapper className='max-h-[650px]'>
      <Table
        {...register}
        styles={styles}
        onLoadMore={fetchAdmins}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell sortKey='email'>Email</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell sortKey='date'>Date Added</Table.HeaderCell>
          <Table.HeaderCell sortKey='ip'>IP</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {data.map((data, idx) => (
            <Table.BodyRow key={idx} className='py-4'>
              <Table.BodyCell>{data.email}</Table.BodyCell>
              <Table.BodyCell>{data.status}</Table.BodyCell>
              <Table.BodyCell>{data.date}</Table.BodyCell>
              <Table.BodyCell>{data.ip}</Table.BodyCell>
              <Table.BodyCell className='flex gap-x-2'>
                <Button size='xs' className='rounded-full' onClick={handleAction}>
                  Disable
                </Button>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </Table.Wrapper>
  );
});

export default AdminsTable;
