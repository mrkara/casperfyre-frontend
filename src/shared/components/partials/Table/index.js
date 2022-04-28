/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames';
import { cloneElement, createContext, useContext, useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Loading } from 'shared/components/modules/Loading';
import style from './style.module.scss';
import * as Icon from 'react-feather';
import { useStateCallback } from 'shared/hooks/useStateCallback';

const DIRECTION = {
  0: 'asc',
  1: 'desc',
};

const TableContext = createContext({});

const ArrowSort = ({ direction }) => <div className={classNames(style.arrow, style[direction])} />;

const Table = (props) => {
  const [sortKey, setSortKey] = useState();
  const [styles, setStyles] = useState();
  const [sortDirection, setSortDirection] = useState();
  const [targetId] = useState(props.target ? props.target : Math.random().toString(36).substring(7));

  useEffect(() => {
    if (sortKey && sortDirection >= 0 && props.onSort && typeof props.onSort === 'function') {
      props.onSort(sortKey, DIRECTION[sortDirection]);
    }
  }, [sortKey, sortDirection]);

  useEffect(() => {
    if (props.register && typeof props.register === 'function') {
      props.register(targetId);
    }
  }, []);

  useEffect(() => {
    setStyles(props.styles);
  }, [props.styles]);

  return (
    <TableContext.Provider
      value={{
        sortKey,
        setSortKey,
        canExpand: props.canExpand,
        sortDirection,
        setSortDirection,
        targetId,
        isTarget: !!props.target,
        styles,
      }}
    >
      <div className={`${props.className || ''} table-container flex flex-col min-w-250 h-full flex-1 min-h-0 text-sm`}>
        {props.children[0]}
        {cloneElement(props.children[1], {
          onLoadMore: props.onLoadMore,
          hasMore: props.hasMore,
          dataLength: props.dataLength,
          height: props.height,
        })}
      </div>
    </TableContext.Provider>
  );
};

Table.Wrapper = (props) => {
  return <div className={classNames('overflow-auto', props.className)}>{props.children}</div>;
};

Table.Header = (props) => {
  const { canExpand } = useContext(TableContext);

  return (
    <div className='table-header flex w-full pb-2.5 border-b px-2'>
      {canExpand && <Table.HeaderCell index='0' />}
      {props.children
        .filter((x) => x.type === Table.HeaderCell)
        .map((child, i) =>
          cloneElement(child, {
            index: i + 1,
          })
        )}
    </div>
  );
};

Table.HeaderCell = (props) => {
  const { sortKey, setSortKey, sortDirection, setSortDirection, styles } = useContext(TableContext);
  const [pendingSort, setPendingSort] = useState(false);
  const triggerSort = () => {
    if (props.sortKey) {
      setPendingSort(true);
      setSortKey(props.sortKey);
      setSortDirection(sortDirection ^ 1);
      setTimeout(() => setPendingSort(false), 1500);
    }
  };

  return (
    <div
      className={`
        ${props.className || ''} 
        ${styles?.[`col-${props.index}`] || ''}
        col col-${props.index} 
        text-sm`}
    >
      <button
        type='button'
        className='text-left font-semibold text-xs focus:outline-none flex items-center cursor-pointer disabled:cursor-not-allowed'
        onClick={triggerSort}
        disabled={pendingSort}
      >
        {props.children}
        {props.sortKey && sortKey === props.sortKey && <ArrowSort direction={DIRECTION[sortDirection]} />}
      </button>
    </div>
  );
};

Table.Header.Cell = Table.HeaderCell;

Table.Body = (props) => {
  const { targetId, isTarget } = useContext(TableContext);

  return (
    <div
      {...(!isTarget ? { id: targetId } : {})}
      className={`table-body ${props.className || ''} ${isTarget ? '' : 'overflow-y-scroll'}`}
    >
      <InfiniteScroll
        className='flex flex-col w-full'
        dataLength={props.dataLength || 0}
        next={props.onLoadMore}
        hasMore={props.hasMore}
        loader={
          <div className='text-primary py-4 flex justify-center loading-data'>
            <Loading />
          </div>
        }
        scrollableTarget={targetId}
        scrollThreshold={0.99}
      >
        {props.dataLength ? (
          props.children
        ) : !props.hasMore ? (
          <p className='py-4 text-center opacity-40 no-result-text'>No Results Found</p>
        ) : (
          <></>
        )}
      </InfiniteScroll>
    </div>
  );
};

Table.BodyRow = (props) => {
  const [open, setOpen] = useState();
  const { canExpand } = useContext(TableContext);
  const doSelectRow = () => {
    if (props.selectRowHandler && typeof props.selectRowHandler === 'function') {
      props.selectRowHandler();
    }
  };
  return (
    <div className={classNames('table-body-row', style.tableBodyRow, canExpand && 'table-row-can-expand')}>
      <div
        className={`${props.className || ''} text-[10px] flex items-center flex-row w-full py-2 border-b border-gray3 ${
          props.selectRowHandler ? 'cursor-pointer hover:bg-white1' : ''
        }`}
        onClick={doSelectRow}
      >
        {canExpand && (
          <Table.BodyCell index='0'>
            <button onClick={() => setOpen(!open)}>
              {!open ? <Icon.ChevronDown className='w-4 h-4' /> : <Icon.ChevronUp className='w-4 h-4' />}
            </button>
          </Table.BodyCell>
        )}
        {props.children
          .filter((x) => x.type === Table.BodyCell)
          .map((child, i) =>
            cloneElement(child, {
              index: i + 1,
            })
          )}
      </div>
      {canExpand && !!open && <>{props.children.find((x) => x.type === Table.BodyExpandRow)}</>}
    </div>
  );
};

Table.BodyCell = (props) => {
  const { styles } = useContext(TableContext);

  return (
    <div className={`${props.className || ''} col text-[10px] col-${props.index} pr-5 ${styles?.[`col-${props.index}`] || ''}`}>
      {props.children}
    </div>
  );
};

Table.BodyExpandRow = (props) => {
  return <div className='py-4 table-row-expand border-b border-gray3 bg-gray-50'>{props.children}</div>;
};

Table.Body.Cell = Table.BodyCell;
Table.Body.Row = Table.BodyRow;
Table.Body.ExpandRow = Table.BodyExpandRow;

const DEFAULT_LIMIT = 10;

const useTable = () => {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [params, setParams] = useStateCallback({ limit: DEFAULT_LIMIT });
  const [tableId, setTableId] = useState();

  const appendData = (res, reverse = false) => {
    if (reverse) {
      setData((prevData) => [...res, ...prevData]);
    } else {
      setData((prevData) => [...prevData, ...res]);
    }
  };

  const getTableId = (id) => {
    setTableId(id);
  };

  const resetData = () => {
    const $table = document.getElementById(tableId);
    if ($table) {
      $table.classList.add('opacity-0');
      $table.scrollTop = 0;
      setTimeout(() => {
        setData([]);
        setPage(1);
        setHasMore(true);
        $table.classList.remove('opacity-0');
      }, 50);
    }
  };

  return {
    data,
    setData,
    register: { register: getTableId },
    hasMore,
    page,
    appendData,
    resetData,
    setHasMore,
    setPage,
    params,
    setParams,
  };
};

export { Table, useTable };
