import React, { useState }  from 'react';
import style from './OpenChat.module.css';
import { SvgImages } from '../../images/SvgImages';

export const OpenChat = (props) => {
  const { colorStart, colorEnd, setOpen } = props;
  const [color, setColor] = useState(colorStart)
  const mouseEnter = () => setColor(colorEnd);
  const mouseLeave = () => setColor(colorStart);
  return(
    <div className={style.icon} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} onClick={() => setOpen(true)}>
      <SvgImages svg={'openChat'} fill={color}/>
    </div>
  )
}
