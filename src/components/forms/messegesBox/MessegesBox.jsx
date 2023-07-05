import {memo}  from 'react';
import AudioPlayer from './audio/AudioPlayer';
import VideoPlayer from './video/VideoPlayer';
import style from './MessegesBox.module.css';
import MyImage from './image/MyImage';
import FileAvailabilityCheck from '../../hocs/FileAvailabilityCheck';
import Document from './document/Document';

export const MessegesBox = memo((props) => {
  const { messeges, colors, SvgImages } = props;
  let currentDate = null;

  const dateChangeCheck = (date) => {
    if (currentDate === null) {
      currentDate = date;
      return false;
    } else {
      if (date === currentDate) return false;
      currentDate = date;
      return true;
    }
  }
 
  return(
    messeges.map((item, i) => {
      let [dateSend, timeSend] = item.date.split(',');
      return (
        <div className={style.msgbox} key={'msg' + i}>
          {
            dateChangeCheck(dateSend) === true && 
            <div className={style.newDate}>{dateSend}</div>
          }
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
              <div className={style.date}>{timeSend}</div>
            </div>
          </div>
        </div>
      )
    })
  )
});
