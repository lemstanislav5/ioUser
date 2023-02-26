import React from 'react';
import style from './MessegesBox.module.css';

export const MessegesBox = (props) => {
  const { messeges, options, SvgImages } = props;

  return(
    messeges.map((item, i) => {
      return (
        <div className={style.msgbox} key={'msg' + i}>
          <div className={style[item.type]} key={i}  style={{'backgroundColor': options.colors[item.type]}}>
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
