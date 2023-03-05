import React, { useState, useEffect } from 'react';
import style from './Record.module.css';
import { SvgImages } from '../../../images/SvgImages';


export const Record = (props) => {
  const { color } = props;
  let [record, setRecord] = useState(false);
  let [voice, setVoice] = useState([]);
  let [mediaRecorder, setMediaRecorder] = useState(null);
  
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true})
      .then(stream => {
        setMediaRecorder(new MediaRecorder(stream));
      })    
  }, [])


  const startRecording = () => {
    if (mediaRecorder === null) return false; 
    console.log('startRecording', mediaRecorder)
    console.log(mediaRecorder.state);
    mediaRecorder.start();
    mediaRecorder.addEventListener("dataavailable",function(event) {
      console.log(event)
      // setVoice([...voice, event.data]);
    });
  }

  const stopRecording = () => {
    if (mediaRecorder === null) return false; 
    console.log('stopRecording', voice)
    mediaRecorder.stop();
    // const voiceBlob = new Blob(voice, { type: 'audio/wav' });
    // console.log(voiceBlob)
  }

  useEffect(() => {
    if(record) return startRecording();
    stopRecording();
  }, [record, voice]);

  return(
    <>
      <div className={style.record} onClick={() => setRecord(record? false: true)}>
        <SvgImages svg={'record'} fill={color} />
      </div>
    </>
  )
}
