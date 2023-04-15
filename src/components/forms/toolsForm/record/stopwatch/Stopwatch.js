import React, { useState, useEffect } from "react";
import style from "./Stopwatch.module.css";

export const Stopwatch = (props) => {
  const { timeLimit, stop } = props;
  let [seconds, setSeconts] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {setSeconts(seconds++)}, 10);
    if (seconds === timeLimit) {
      clearInterval(interval);
      stop()
    };
    const cleanup = () => {
      clearInterval(interval);
    };
    
    return cleanup;
  });

  const getTime = (time) => {
    if (time < 10) return '00:0' + time;
    if (time < 60) return '00:' +time;
    let minutes = Math.floor(time / 60);
    if (minutes < 10)  minutes = '0' + minutes
    let seconds = time - minutes * 60;
    if (seconds < 10)  seconds = '0' + seconds
    return minutes + ':' + seconds;
  };

  return <div className={style.stopwatch}>{ getTime(seconds) }</div>;
};