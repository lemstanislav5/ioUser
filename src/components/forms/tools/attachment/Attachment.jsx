import React, { useState, useRef } from 'react';
import style from './Attachment.module.css';
import { SvgImages } from '../../../images/SvgImages';

export const Attachment = (props) => {
  const { color, upload, limitSizeFile } = props;
  const [errorMb, setErrorMb] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const ref = useRef(null)

  const updateSize = (file) => {
    const mb = 1048576
    const type = file.type.replace('image/', '');
    console.log(file.type.replace('image/', ''));
    const filesExt = ['jpeg', 'jpg','png'];
    console.log(file.size, mb * limitSizeFile, type, file.size > mb * limitSizeFile, filesExt.indexOf(type) === -1);
    if (file.size > mb * limitSizeFile || filesExt.indexOf(type) === -1) return setErrorMb(true)
    if (file.size > mb * limitSizeFile || filesExt.indexOf(type) === -1) return setErrorType(true)
    window._file = file;
  }
  return(
    <>
      <div className={style.attachment} onClick={() => {
          console.log(ref)
          ref.current.click()
        }}>
        {errorMb && <div className={style.error}>Лимит файла в 5 МБ превышен</div>}
        {errorType && <div className={style.error}>Допустимы орматы: 'jpeg', 'jpg','png'</div>}
        <SvgImages svg={'attachment'} fill={color} />
      </div>
      <input ref={ref} className={style.inputFile} type="file" onChange={event => updateSize(event.target.files[0])}/>
    </>
  )
}
