import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import APICallsDetailModal from 'shared/components/modules/Modals/APICallsDetail';
import { Button } from 'shared/components/partials';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { useQuery } from 'shared/hooks/useQuery';
import { getHistories } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const ApiCallsTable = React.forwardRef(({ externalParams }, ref) => {
  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

  const query = useQuery();
  const { appendDialog } = useDialog();

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

  const handleViewAPIDetail = () => {
    appendDialog(<APICallsDetailModal />);
  };

  const handleAPIStatus = (success, fulfilled) => {
    const status = {
      text: '',
      isSuccess: false,
    };
    switch (fulfilled) {
      case '1':
        status.text = 'Delivered';
        status.isSuccess = true;
        break;
      case '2':
        status.text = 'Failed';
        break;

      default:
        if (success === '1') {
          status.text = 'Confirmed';
          status.isSuccess = true;
        }
        break;
    }
    return status;
  };

  return (
    <Table
      {...register}
      styles={styles}
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
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.id}</Table.BodyCell>
            <Table.BodyCell>{data.created_at}</Table.BodyCell>
            <Table.BodyCell>{data.amount}</Table.BodyCell>
            <Table.BodyCell
              className={classNames('text-primary', {
                'text-success': handleAPIStatus(data.success, data.fulfilled).isSuccess,
              })}
            >
              {handleAPIStatus(data.success, data.fulfilled).text}
            </Table.BodyCell>
            <Table.BodyCell>{data.ip}</Table.BodyCell>
            <Table.BodyCell>{data.address}</Table.BodyCell>
            <Table.BodyCell>
              <div>
                <div>
                  {data.return_code} - IP {data.ip}
                </div>
                <div>{data.deploy_hash}</div>
              </div>
            </Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <Button size='sm' rounded onClick={handleViewAPIDetail}>
                View
              </Button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default ApiCallsTable;
