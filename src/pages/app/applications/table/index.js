import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, useTable } from 'shared/components/partials/Table';
import { getGuid } from 'shared/core/services/auth';
import { getApplications } from 'stores/app/actions';
import styles from './style.module.scss';

const ApplicationsTable = React.forwardRef(({ outParams }, ref) => {
  const guid = getGuid();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchApplications();
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

  const fetchApplications = () => {
    dispatch(
      getApplications(
        {
          guid,
        },
        (res) => {
          appendData(res.detail);
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
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell sortKey='applicationDate'>
          <p>Application Date</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Email</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Company</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>IP</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Expected Monthly CSPR</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Reason</p>
        </Table.HeaderCell>
        <Table.HeaderCell>
          <p>Action</p>
        </Table.HeaderCell>
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
              <Link to={'/'} className='text-primary text-xs underline decoration-1'>
                View
              </Link>
            </Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <button type='button' className='text-white bg-primary rounded-full text-xs px-7 py-1 text-center'>
                Approve
              </button>
              <button
                type='button'
                className='rounded-full text-xs px-7 py-1 text-center bg-white border border-primary text-primary'
              >
                Deny
              </button>
            </Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default ApplicationsTable;
