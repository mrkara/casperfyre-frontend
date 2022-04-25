import classNames from 'classnames';
import React, { Fragment } from 'react';
import styles from './style.module.scss';
import { Link } from 'react-router-dom';

const Breadcrumb = (props) => {
  return (
    <div className={classNames(styles.breadcrumb, props.className)}>
      {props.data?.map((child, index) => {
        return (
          <Fragment key={index}>
            <Link className={classNames(index === props.data?.length - 1 && 'text-primary')} to={child.href}>
              {child.label}
            </Link>
            {index === props.data?.length - 1 ? '' : <span>/</span>}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
