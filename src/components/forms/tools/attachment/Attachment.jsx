import React, { useState, useRef } from 'react';
import style from './Attachment.module.css';
import { SvgImages } from '../../../images/SvgImages';

export const Attachment = (props) => {
  const { color, upload, limitSizeFile } = props;
  const [error, setError] = useState(false);
  const ref = useRef(null)

  const updateSize = (file) => {
    const mb = 1048576
    if (file.size > mb * limitSizeFile) return setError(true)
    //var filesExt = ['jpg','png','rar','zip','docx','pdf','rtf','doc'];
    window._file = file;
    console.log(file.size, file.type);
  }
  return(
    <>
      <div className={style.attachment} onClick={() => {
          console.log(ref)
          ref.current.click()
        }}>
        {error && <div className={style.error}>Лимит файла в 5 МБ превышен</div>}
        <SvgImages svg={'attachment'} fill={color} />
      </div>
      <input ref={ref} className={style.inputFile} type="file" onChange={event => updateSize(event.target.files[0])}/>
    </>
  )
}
