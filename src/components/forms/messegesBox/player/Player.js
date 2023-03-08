import React, { useState, useEffect } from "react";
import style from './Player.module.css';

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState('00:00');

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },[playing, audio]);

  useEffect(() => {
    audio.addEventListener('timeupdate', () => {
      setDuration(new Date(audio.currentTime * 1000).toISOString().substring(14, 19));
    });
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle, duration];
};

const Player = ({ url, SvgImages }) => {
  const [playing, toggle, duration] = useAudio(url);

  return (
    <div onClick={toggle}>
      { duration && <div className={style.duration}> { duration } </div> }
      {
        playing ? <SvgImages svg='pause' fill={'#fff'}/> : <SvgImages svg='play' fill={'#fff'}/>
      }
    </div>
  );
};

export default Player;
