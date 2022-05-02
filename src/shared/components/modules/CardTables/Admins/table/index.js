import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { disableUser, enableUser, getAdmins } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const AdminsTable = React.forwardRef(({ externalParams }, ref) => {
  const guid = getGuid();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData, setData } =
    useTable();
  const dispatch = useDispatch();

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

  const handleAction = (idx, admin_approved, guid) => {
    if (admin_approved !== '1' && admin_approved !== '2') {
      dispatch(
        enableUser({ guid }, () => {
          data[idx].admin_approved = '1';
          setData([...data]);
        })
      );
    }
    if (admin_approved === '1')
      dispatch(
        disableUser({ guid }, () => {
          data[idx].admin_approved = '3';
          setData([...data]);
        })
      );
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
              <Table.BodyCell
                className={classNames({ 'text-primary': data.admin_approved !== '1' && data.admin_approved !== '2' })}
              >
                {data.admin_approved === '1' ? 'Active' : data.admin_approved === '2' ? 'Denied' : 'Inactive'}
              </Table.BodyCell>
              <Table.BodyCell>{data.created_at}</Table.BodyCell>
              <Table.BodyCell>{data.last_ip}</Table.BodyCell>
              <Table.BodyCell className='flex gap-x-2'>
                <Button
                  size='xs'
                  variant={data.admin_approved !== '1' && data.admin_approved !== '2' ? 'outline' : 'contained'}
                  className='rounded-full'
                  onClick={() => handleAction(idx, data.admin_approved, data.guid)}
                >
                  {data.admin_approved === '1' ? 'Disable' : 'Re-active'}
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
