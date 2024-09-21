import { useRef } from 'react';
import style from './Attachment.module.css';
import { SvgImages } from '../../../images/SvgImages';

export const Attachment = ({ color, handlerFileСheck }) => {
  const ref = useRef(null)
  return(
    <>
      <div className={style.attachment} onClick={() => {
          ref.current.click()
        }}>
        <SvgImages svg={'attachment'} fill={color} />
      </div>
      <input ref={ref} className={style.inputFile} type="file" onChange={event => handlerFileСheck(event.target.files[0])}/>
    </>
  )
}
