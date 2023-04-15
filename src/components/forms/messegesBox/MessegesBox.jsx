//!style.date добавить нули в отображении времени отправки сообщения

import React from 'react';
import AudioPlayer from './audio/AudioPlayer';
import VideoPlayer from './video/VideoPlayer';
import style from './MessegesBox.module.css';
import MyImage from './image/MyImage';
import FileAvailabilityCheck from '../../hocs/FileAvailabilityCheck';
import Document from './document/Document';
export const MessegesBox = (props) => {
  const { messeges, colors, SvgImages } = props;

  return(
    messeges.map((item, i) => {
      return (
        <div className={style.msgbox} key={'msg' + i}>
          <div className={style[item.type]} key={i}  style={{'backgroundColor': colors[item.type]}}>
            {
              item.type === 'to' &&
              <div className={style.message}>{item.text}</div>
            }
            {
              item.type === 'from' &&
              <div className={style.message}>{item.text}</div>
            }
            {
              item.type === 'notification' &&
              <div className={style.notificationText}>{item.text}</div>
            }
            {
              item.type === 'toImage' &&
              <FileAvailabilityCheck className={style.toImage} url={item.text} SvgImages={SvgImages} Component={MyImage}/>
            }
            {
              item.type === 'toDocuments' &&
              <FileAvailabilityCheck url={item.text} SvgImages={SvgImages} Component={Document}/>
            }
            {
              item.type === 'toAudio' &&
              <FileAvailabilityCheck url={item.text} SvgImages={SvgImages} Component={AudioPlayer}/>
            }
            {
              item.type === 'toVideo' &&
              <FileAvailabilityCheck url={item.text} SvgImages={SvgImages} Component={VideoPlayer}/>
            }
            {
              item.type === 'fromImage' &&
              <FileAvailabilityCheck className={style.fromImage} url={item.text} SvgImages={SvgImages} Component={MyImage}/>
            }
            {
              item.type === 'fromDocuments' &&
              <FileAvailabilityCheck url={item.text} SvgImages={SvgImages} Component={Document}/>
            }
            {
              item.type === 'fromAudio' &&
              <FileAvailabilityCheck url={item.text} SvgImages={SvgImages} Component={AudioPlayer}/>
            }
            {
              item.type === 'fromVideo' &&
              <FileAvailabilityCheck url={item.text} SvgImages={SvgImages} Component={VideoPlayer}/>
            }
            <div className={item.type === 'notification'? style.bottomNotification : style.bottomMessage}>
              {
                (item.type === 'to') &&
                  <>
                    <div className={style.serverAccepted}>
                      <SvgImages svg='daw' fill={item.serverAccepted ? '#0cec0c' : ' #e82554'}/>
                    </div>
                    <div className={style.botAccepted}>
                      <SvgImages svg='line' fill={item.botAccepted ? '#0cec0c' : ' #e82554'}/>
                    </div>
                  </>
              }
              <div className={style.date}>{item.date.split(',')[1]}</div>
            </div>
          </div>
        </div>
      )
    })
  )
}
