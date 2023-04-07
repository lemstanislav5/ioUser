import React, { useState, useRef, useEffect } from 'react';
import style from './Record.module.css';
import { SvgImages } from '../../../images/SvgImages';
import { recorder } from '../../../../services/recorder';
const mimeType = "audio/mp3";

export const Record = (props) => {
  const { fileСheck } = props;
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [color, setColor] = useState('#9e9e9e');
  const [audioChunks, setAudioChunks] = useState([]);
  const [count, setCount] = useState({minute: 0, second: 0});
  const [isStarted, setIsStarted] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    intervalId = setInterval(watch, 1000);
    setIntervalId(intervalId)
  }, []);

  let watch = () => {
    if(isStarted) {
      let minute = 0, second = 0;
      console.log(second)
      second = count.second + 1;
      minute = Math.floor(second/60)
      if (count.minute === 3) return clearInterval(interval)
      setCount({minute, second}) 
    } else {

    }
    
  }

  const startStop = () => start ? setStart(false): setStart(true);

  const init = () => {
    if (!stream && !mediaRecorder.current) {
      getMicrophonePermission();
      setColor('#000');
    } else if (stream && !mediaRecorder.current) {
      // recorder.startRecording(stream, mimeType, mediaRecorder, setAudioChunks)
      setColor('#ff5722');
      setIsStarted(!isStarted);
    } else if (stream && mediaRecorder.current) {
      // recorder.stopRecording(mediaRecorder, audioChunks, mimeType, fileСheck, setAudioChunks);
      setColor('#000');
      mediaRecorder.current = null;
      setIsStarted(!isStarted);
    }
  }
  const getMicrophonePermission = async () => {
    if ("MediaRecorder" in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
        setStream(streamData);
      } catch (err) {
        console.log(err.message);
        setColor('#9e9e9e')
      }
    } else {
      console.log("The MediaRecorder API is not supported in your browser.");
      setColor('#9e9e9e')
    }
  };

  return(
    <div className={style.record} onClick={init}>
      <SvgImages svg={'record'} fill={color} />
      {
        count.second !== 0 && <div className={style.stopwatch}>{count.minute +':'+ count.second}</div>
      }
    </div>
  )
}
