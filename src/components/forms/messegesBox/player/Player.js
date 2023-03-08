import React, { useState, useEffect } from "react";
import style from './Player.module.css';

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState('00:00');
  const [err, setErr] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  },[playing, audio]);

  useEffect(() => {
    console.log(audio.duration)
    audio.addEventListener('timeupdate', () => {
      setDuration(new Date(audio.currentTime * 1000).toISOString().substring(14, 19));
    });
    audio.addEventListener('error', () => {
      setErr(true);
    });
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return [playing, toggle, duration, err];
};

const Player = ({ url, SvgImages }) => {
  const [playing, toggle, duration, err] = useAudio(url);
  console.log(playing)
  if (err) return <SvgImages svg='playError'/>
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
