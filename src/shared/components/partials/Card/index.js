import classNames from 'classnames';
import styles from './style.module.scss';

const Card = (props) => {
  return (
    <div
      className={classNames(props.className, styles.card)}
    >
      {props.children}
    </div>
  );
};

export { Card };
