import React from 'react';
import style from './Record.module.css';
import { SvgImages } from '../../../images/SvgImages';

export const Record = (props) => {
  const { color } = props;
  //https://habr.com/ru/post/484196/
  return(
    <>
      <div className={style.record} onClick={() => {}}>
        <SvgImages svg={'record'} fill={color} />
      </div>
    </>
  )
}
