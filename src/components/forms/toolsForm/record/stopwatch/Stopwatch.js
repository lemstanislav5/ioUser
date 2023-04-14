import React, { useState, useEffect } from "react";
import style from "./Stopwatch.module.css";

export const Stopwatch = () => {
  const [seconds, setSeconts] = useState(0);

  useEffect(() => {
    const tick = (num) => setSeconts(seconds + num);

    const interval = setInterval(() => tick(1), 1000);

    const cleanup = () => {
      clearInterval(interval);
    };
    return cleanup;
  });

  return <div className={style.stopwatch}>{ seconds }</div>;
};