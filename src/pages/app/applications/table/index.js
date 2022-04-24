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

const ApplicationsTable = React.forwardRef(({ externalParams }, ref) => {
  const guid = getGuid();

  const { appendDialog } = useDialog();

  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData, setData } =
    useTable();

  const dispatch = useDispatch();

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams(
        { ...params, ...externalParams, guid },
        (s) => {
          fetchApplications(s, 1);
        }
      );
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
        fetchApplications(s, 1);
      }
    );
  };

  const fetchApplications = (paramsValue = params, pageValue = page) => {
    dispatch(
      getApplications(
        { ...paramsValue, page: pageValue },
        (res) => {
          setHasMore(res.hasMore);
          appendData(res.items || []);
          setPage((prev) => +prev + 1);
        }
      )
    );
  };

  const handleRemove = (guid) => {
    const applicationIdx = data.findIndex((application) => application.guid === guid);
    if (applicationIdx !== -1) {
      data.splice(applicationIdx, 1);
      setData([...data]);
    }
  };

  const handleShowModal = (name, application) => {
    switch (name) {
      case 'approve':
        appendDialog(<ApproveModal application={application} onApprove={handleRemove} />);
        break;
      case 'deny':
        appendDialog(<DenyModal application={application} onDeny={handleRemove} />);
        break;
      default:
        appendDialog(<ViewModal application={application} />);
        break;
    }
  };

  return (
    <Table
      {...register}
      styles={styles}
      onLoadMore={fetchApplications}
      hasMore={hasMore}
      dataLength={data.length}
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell sortKey='application_date'>Application Date</Table.HeaderCell>
        <Table.HeaderCell sortKey='email'>Email</Table.HeaderCell>
        <Table.HeaderCell sortKey='company'>Company</Table.HeaderCell>
        <Table.HeaderCell>IP</Table.HeaderCell>
        <Table.HeaderCell sortKey='cspr'>Expected Monthly CSPR</Table.HeaderCell>
        <Table.HeaderCell>Reason</Table.HeaderCell>
        <Table.HeaderCell>Action</Table.HeaderCell>
      </Table.Header>
      <Table.Body className="table-body-card">
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell>{data.date}</Table.BodyCell>
            <Table.BodyCell>{data.email}</Table.BodyCell>
            <Table.BodyCell>{data.company}</Table.BodyCell>
            <Table.BodyCell>{data.last_ip}</Table.BodyCell>
            <Table.BodyCell>{data.cspr_expectation}</Table.BodyCell>
            <Table.BodyCell>
              <button
                to={'/'}
                className='text-primary text-[10px] underline decoration-1'
                onClick={() => handleShowModal('view', data)}
              >
                View
              </button>
            </Table.BodyCell>
            <Table.BodyCell className='flex gap-x-2'>
              <button
                type='button'
                className='text-white bg-primary rounded-full text-[10px] px-3 text-center'
                onClick={() => handleShowModal('approve', data)}
              >
                Approve
              </button>
              <button
                type='button'
                className='rounded-full text-[10px] px-3 text-center bg-white border border-primary text-primary'
                onClick={() => handleShowModal('deny', data)}
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
