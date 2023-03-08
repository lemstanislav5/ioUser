import React, { useState, useRef } from 'react';
import style from './Record.module.css';
import { SvgImages } from '../../../images/SvgImages';
const mimeType = "audio/mp3";

export const Record = (props) => {
  const { fileСheck } = props;
  const mediaRecorder = useRef(null);
  const [stream, setStream] = useState(null);
  const [color, setColor] = useState('#9e9e9e');
  const [audioChunks, setAudioChunks] = useState([]);

  const init = () => {
    if (!stream && !mediaRecorder.current) {
      getMicrophonePermission();
      setColor('#000');
    } else if (stream && !mediaRecorder.current) {
      startRecording();
      setColor('#ff5722');
    } else if (stream && mediaRecorder.current) {
      stopRecording();
      setColor('#000');
      mediaRecorder.current = null;
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


  const startRecording = async () => {
    const media = new MediaRecorder(stream, { type: mimeType });
    mediaRecorder.current = media;
    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
       if (typeof event.data === "undefined") return;
       if (event.data.size === 0) return;
       localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
};

  const stopRecording = () => {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
       const audioBlob = new Blob(audioChunks, { type: mimeType });
       let file = new File([audioBlob], "audio.mp3", {type: mimeType});
       fileСheck(file);
       setAudioChunks([]);
    };
  };

  return(
    <>
      <div className={style.record} onClick={init}>
        <SvgImages svg={'record'} fill={color} />
      </div>
    </>
  )
}
