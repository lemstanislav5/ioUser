import React from 'react';
import style from './Attachment.module.css';
import { SvgImages } from '../../../images/SvgImages';

export const Attachment = (props) => {
  const { color, upload } = props;

  const updateSize = (file) => {
    window._file = file;
    console.log(file.size, file.type);
  }
  return(
    <div className={style.attachment}>
      <input type="file" onChange={event => updateSize(event.target.files[0])}/>
      <SvgImages svg={'attachment'} fill={color}/>
    </div>
  )
}
