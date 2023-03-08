import React from "react";

const VideoPlayer = ({ url }) => {
  return (
    <video width="100%" height="100%" controls>
      <source src={url} type="video/mp4"/>
    </video>
  );
};

export default VideoPlayer;