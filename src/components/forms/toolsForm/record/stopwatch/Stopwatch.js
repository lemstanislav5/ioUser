import React, { useState, useEffect } from "react";
import style from "./Stopwatch.module.css";

export const Stopwatch = (props) => {
  const { timeLimit, stop } = props;
  const [startTime] = useState(new Date().getTime());
  let [seconds, setSeconts] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => { 
      let newTime = new Date().getTime() - startTime;
      setSeconts(newTime);
    }, 1000);
    if (seconds === timeLimit) {
      clearInterval(interval);
      stop();
    };
    const cleanup = () => clearInterval(interval);
    return cleanup;
  });
  const millisToSeconds = (millis) => ((millis / 1000).toFixed(3));

  const getTime = (time) => {
    time = Math.floor(millisToSeconds(time));
    if (time < 10) return '00:0' + time;
    if (time < 60) return '00:' +time;
    let minutes = Math.floor(time / 60);
    if (minutes < 10)  minutes = '0' + minutes
    let seconds = time - minutes * 60;
    if (seconds < 10)  seconds = '0' + seconds
    return minutes + ':' + seconds;
  };

  return <div id={Math.floor(millisToSeconds(seconds)) > timeLimit - 10 
                    ? style['blink'] 
                    : seconds} 
              className={style.stopwatch}>{ getTime(seconds) }</div>;
};