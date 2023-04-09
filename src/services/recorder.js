export const recorder = {
  startRecording: (stream, mimeType, mediaRecorder, setAudioChunks) => {
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
  },
  stopRecording: (mediaRecorder, audioChunks, mimeType, fileСheck, setAudioChunks) => {
    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType });
      let file = new File([audioBlob], "audio.mp3", {type: mimeType});
      fileСheck(file);
      setAudioChunks([]);
    };
  }
};
