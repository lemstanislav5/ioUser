import React, { useState, useEffect } from 'react';
import style from './Record.module.css';
import { SvgImages } from '../../../images/SvgImages';
const stream =  navigator.mediaDevices.getUserMedia({audio: true});
let mediaRecorder = new MediaRecorder(stream)

export const Record = (props) => {
  const { color } = props;
  let [record, setRecord] = useState(false);
  let [voice, setVoice] = useState([]);
  // let [mediaRecorder, setMediaRecorder] = useState(null);
  
  
  
  useEffect(async ()=> {
    mediaRecorder.addEventListener("dataavailable",function(event) {
      setVoice([...voice, event.data]);
    });
  }, [])

  const startRecording = () => {
    mediaRecorder.start();
  }

  const stopRecording = () => {
    mediaRecorder.stop();
    const voiceBlob = new Blob(voice, { type: 'audio/wav' });
    console.log(voiceBlob)
  }

//https://stackoverflow.com/questions/50431236/use-getusermedia-media-devices-in-reactjs-to-record-audio
  useEffect(() => {
    if(record) return startRecording();
    stopRecording();
  }, [record, voice]);

  return(
    <>
      <div className={style.record} onClick={() => {}}>
        <SvgImages svg={'record'} fill={color} onClick={() => setRecord(record? false: true)}/>
      </div>
    </>
  )
}
