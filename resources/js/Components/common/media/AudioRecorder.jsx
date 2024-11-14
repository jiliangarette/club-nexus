import { CircleStop, Mic } from "lucide-react";
import { useState } from "react";
import IconButton from "../buttons/IconButton";

const AudioRecorder = ({ fileReady }) => {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recording, setRecording] = useState(false);
  const onMicrophoneClick = async () => {
    if (recording) {
      setRecording(false);
      if (mediaRecorder) {
        mediaRecorder.stop();
        setMediaRecorder(null);
      }
      return;
    }
    setRecording(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      const newMediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      newMediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      newMediaRecorder.addEventListener("stop", (event) => {
        let audioBlob = new Blob(chunks, {
          type: "audio/ogg; codecs=opus",
        });
        let audioFile = new File([audioBlob], "recorded_audio.ogg", {
          type: "audio/ogg;codecs=opus",
        });

        const url = URL.createObjectURL(audioFile);

        fileReady(audioFile, url);
      });
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
    } catch (error) {
      setRecording(false);
      console.log("Error accessing microphone:", error);
    }
  };
  return (
    <IconButton onClick={onMicrophoneClick} className=" text-slate-700">
      {recording && <CircleStop className=" text-red-300" />}
      {!recording && <Mic />}
    </IconButton>
  );
};
export default AudioRecorder;
