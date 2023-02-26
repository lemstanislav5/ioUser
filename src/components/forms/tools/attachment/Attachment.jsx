import React from 'react';
import style from './Attachment.module.css';
import { SvgImages } from '../../../images/SvgImages';

export const Attachment = (props) => {
  const { color } = props;
  return(
    <div className={style.attachment}>
      <SvgImages svg={'attachment'} fill={color}/>
    </div>
  )
}
