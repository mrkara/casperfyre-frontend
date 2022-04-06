import React, { useState } from 'react';
import { ReactComponent as Hide } from 'assets/icons/password-hide.svg';
import { ReactComponent as Show } from 'assets/icons/password-show.svg';
import style from './style.module.scss';

export const Input = React.forwardRef((
  { type, error, ...rest }, ref
) => {
  const [isShow, setIsShow] = useState(false);

  const renderTogglePassword = type === 'password' && (
    <span onClick={() => setIsShow(!isShow)} className={style.showPassword}>
      {isShow ? <Show /> : <Hide />}
    </span>
  );

  const inputProps = {
    ref,
    type: isShow ? 'text' : type,
    className: `${style.inputText} ${error && style.errorInput}`
  };

  return (
    <div className='relative'>
      <input {...inputProps} {...rest} />
      { renderTogglePassword }
    </div>
  );
});
