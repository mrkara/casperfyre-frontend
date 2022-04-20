import classNames from 'classnames';
import styles from './style.module.scss';

const Card = (props) => {
  return <div className={classNames(props.className, styles.card)}>{props.children}</div>;
};

Card.Header = ({ icon, title }) => {
  return (
    <div className='border-b px-6 py-4 flex gap-x-2 items-center'>
      <span>{icon}</span>
      <p className='text-primary font-semibold'>{title}</p>
    </div>
  );
};

Card.Body = ({ children }) => {
  return <div className='flex-1 min-h-0 px-6 py-4'>{children}</div>;
};

const CardHeader = Card.Header;
const CardBody = Card.Body;

export { Card, CardHeader, CardBody };
