import React, { useRef }  from 'react';
import style from './MessegesBox.module.css';
import { SvgImages } from '../../images/SvgImages';

export const MessegesBox = (props) => {
  const lastMessage = useRef(null);
  const { messeges, options } = props;

  return(
    messeges.map((item, i, array) => {
      return (
        <div className={style.msgbox} key={'msg' + i}>
          <div ref={lastMessage} className={style[item.type] + (i === array.length - 1 ? ' LAST MESSAGE' : '')} key={i}  style={{'backgroundColor': options.colors[item.type]}}>
            <div className={style.message}>{item.text}</div>
              {
                item.type === 'to' ?
                  <>
                    <div className={style.serverAccepted}>
                      <SvgImages svg='daw' fill={item.serverAccepted ? '#0cec0c' : ' #e82554'}/>
                    </div>
                    <div className={style.botAccepted}>
                      <SvgImages svg='line' fill={item.botAccepted ? '#0cec0c' : ' #e82554'}/>
                    </div>
                  </>
                : ''
              }
            <div className={style.date}>{item.date.split(',')[1]}</div>
          </div>
        </div>
      )
    })
  )
}
