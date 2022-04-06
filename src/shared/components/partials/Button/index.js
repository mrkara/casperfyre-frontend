// import { Loading } from '@shared/components/Loading';
import classNames from 'classnames';
import { createElement, useRef } from 'react';
import './style.module.scss';

export const Button = (props) => {
  const {
    children,
    variant = 'contained',
    color = 'primary',
    size = 'md',
    className,
    isLoading,
    as = 'button',
    onClick,
    ...otherProps
  } = props;
  const rippleRef = useRef(null);

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (rippleRef?.current) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple-element');
      rippleRef.current.innerHTML = '';
      rippleRef.current.appendChild(ripple);

      const diameter = Math.max(e.currentTarget.clientWidth, e.currentTarget.clientHeight);
      ripple.style.width = ripple.style.height = `${diameter}px`;
      const rect = e.currentTarget.getBoundingClientRect();
      const left = e.clientX - rect.left - diameter / 2;
      const top = e.clientY - rect.top - diameter / 2;
      ripple.style.left = `${left}px`;
      ripple.style.top = `${top}px`;
      ripple.style.transitionDuration = '225ms';
      setTimeout(() => {
        ripple.remove();
      }, 300);
    }
    if(onClick) {
      onClick(e);
    }
  };

  const renderChildren = (
    <>
      <span className="ripple-box" ref={rippleRef} />
      <div className='relative flex justify-center items-center text-center w-full h-full'>
        {isLoading ? (
          <div className='loading'>
            {/* <Loading className='w-6 h-6 text-gray2' /> */}
          </div>
        ) : (
          children
        )}
      </div>
    </>
  );

  return createElement(
    as,
    {
      className: classNames('btn', className, {
        [`btn-${color} btn-${color}-${variant}`]: variant !== 'text',
        [`btn-${size}`]: size,
        [variant]: variant,
        'cursor-not-allowed': isLoading
      }),
      onClick: handleClick,
      ...otherProps,
    },
    renderChildren
  );
};
