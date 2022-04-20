import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useDialog } from 'shared/components/partials/Dialog/Provider';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getApplications } from 'stores/app/actions';
import ApproveModal from '../modal/approve';
import DenyModal from '../modal/deny';
import ViewModal from '../modal/view';
import styles from './style.module.scss';

const ApplicationsTable = React.forwardRef(({ outParams }, ref) => {
  const guid = getGuid();

  const { appendDialog } = useDialog();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

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
      getApplications(
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

  const handleApprove = () => {
    appendDialog(<ApproveModal guid={guid} />);
  };

  const handleDeny = () => {
    appendDialog(<DenyModal />);
    // dispatch(
    //   denyUser({ guid }, (res) => {
    //     console.log('oke: ', res);
    //   })
    // );
  };

  const handleView = () => {
    appendDialog(<ViewModal />);
  };

  return (
    <div className='h-full overflow-x-auto'>
      <Table
        {...register}
        styles={styles}
        onLoadMore={fetchApplications}
        hasMore={hasMore}
        dataLength={data.length}
        onSort={handleSort}
      >
        <Table.Header>
          <Table.HeaderCell sortKey='applicationDate'>Application Date</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Company</Table.HeaderCell>
          <Table.HeaderCell>IP</Table.HeaderCell>
          <Table.HeaderCell>Expected Monthly CSPR</Table.HeaderCell>
          <Table.HeaderCell>Reason</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
          {data.map((data, idx) => (
            <Table.BodyRow key={idx} className='py-4'>
              <Table.BodyCell>{data.date}</Table.BodyCell>
              <Table.BodyCell>{data.email}</Table.BodyCell>
              <Table.BodyCell>{data.company}</Table.BodyCell>
              <Table.BodyCell>{data.last_ip}</Table.BodyCell>
              <Table.BodyCell>{data.cspr_expectation}</Table.BodyCell>
              <Table.BodyCell>
                <button to={'/'} className='text-primary text-[10px] underline decoration-1' onClick={handleView}>
                  View
                </button>
              </Table.BodyCell>
              <Table.BodyCell className='flex gap-x-2'>
                <button
                  type='button'
                  className='text-white bg-primary rounded-full text-[10px] px-3 text-center'
                  onClick={handleApprove}
                >
                  Approve
                </button>
                <button
                  type='button'
                  className='rounded-full text-[10px] px-3 text-center bg-white border border-primary text-primary'
                  onClick={handleDeny}
                >
                  Deny
                </button>
              </Table.BodyCell>
            </Table.BodyRow>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
});

export default ApplicationsTable;
