import { useState, useRef } from 'react';
import style from './Record.module.css';
import { SvgImages } from '../../../images/SvgImages';
import { recorder } from '../../../../services/recorder';
import { Stopwatch } from './stopwatch/Stopwatch';
const mimeType = "audio/mp3";

export const Record = ({ handlerFileСheck }) => {
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [color, setColor] = useState('#9e9e9e');
  const [audioChunks, setAudioChunks] = useState([]);
  const [isStarted, setIsStarted] = useState(false);

  const start = () => {
    recorder.startRecording(stream, mimeType, mediaRecorder, setAudioChunks)
    setColor('#ff5722');
    setIsStarted(!isStarted);
  }
  const stop = () => {
    recorder.stopRecording(mediaRecorder, audioChunks, mimeType, handlerFileСheck, setAudioChunks);
    setColor('#000');
    mediaRecorder.current = null;
    setIsStarted(!isStarted);
  }
  const init = () => {
    if (!stream && !mediaRecorder.current) {
      getMicrophonePermission();
      setColor('#000');
    } else if (stream && !mediaRecorder.current) {
      start();
    } else if (stream && mediaRecorder.current) {
      stop();
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
      { isStarted === true && <Stopwatch timeLimit={300} stop={stop}/>}
    </div>
  )
}
