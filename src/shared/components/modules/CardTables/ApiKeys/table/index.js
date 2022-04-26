import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { STATUS } from 'shared/common/enum';
import { Button } from 'shared/components/partials';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getAPIKeys } from 'stores/app/actions';
import styles from './style.module.scss';

const ApiKeysTable = React.forwardRef(({ externalParams }, ref) => {
  const guid = getGuid();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams({ ...params, ...externalParams, guid }, (s) => {
        fetchApiKeys(s, 1);
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
        fetchApiKeys(s, 1);
      }
    );
  };

  const fetchApiKeys = (paramsValue = params, pageValue = page) => {
    dispatch(
      getAPIKeys(
        { ...paramsValue, page: pageValue },
        (res) => {
          setHasMore(res.hasMore);
          appendData(res.items || []);
          setPage((prev) => +prev + 1);
        },
        (error) => {
          setHasMore(false);
          toast('Something went wrong. Please try again !');
        }
      )
    );
  };

  const handleKeySelect = (api_key_id, guid) => {
    history.push(`/app/api-keys/detail?api_key_id=${api_key_id}&guid=${guid}`);
  };

  return (
    <Table
      {...register}
      styles={styles}
      onLoadMore={fetchApiKeys}
      hasMore={hasMore}
      dataLength={data.length}
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell sortKey='userId'>User ID</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Activation Date</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Company</Table.HeaderCell>
        <Table.HeaderCell>Total API Calls</Table.HeaderCell>
        <Table.HeaderCell>Total CSPR Sent</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow
            key={idx}
            className='py-4'
            selectRowHandler={() => handleKeySelect(data.api_key_id, data.guid)}
          >
            <Table.BodyCell>{data.userId}</Table.BodyCell>
            <Table.BodyCell className={classNames({ 'text-primary': data.active === STATUS.INACTIVE })}>
              {data.active === STATUS.ACTIVE ? 'Active' : 'Inactive'}
            </Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell>{data.email}</Table.BodyCell>
            <Table.BodyCell>{data.company}</Table.BodyCell>
            <Table.BodyCell>{data.total_calls}</Table.BodyCell>
            <Table.BodyCell>{data.total_cspr_sent}</Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button size='sm' rounded>
                Approve
              </Button>
              <Button size='sm' variant='outline' rounded>
                Deny
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default ApiKeysTable;
