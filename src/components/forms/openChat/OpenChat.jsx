import React, { useState }  from 'react';
import style from './OpenChat.module.css';
import { SvgImages } from '../../images/SvgImages';

export const OpenChat = (props) => {
  const { setOpen } = props;
  const [color, setColor] = useState('#FFC107');

  return(
    <div className={style.icon} onMouseEnter={() => setColor('#333')} onMouseLeave={() => setColor('#FFC107')} onClick={() => setOpen(true)}>
      <SvgImages svg={'openChat'} fill={color}/>
    </div>
  )
}
