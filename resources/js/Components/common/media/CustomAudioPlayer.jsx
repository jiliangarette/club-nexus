import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

const CustomAudioPlayer = ({ file, showVolume = true }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      setDuration(audio.duration);
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const value = e.target.value;
    audioRef.current.volume = volume;
    setVolume(volume);
  };

  const handleTimeUpdate = (e) => {
    const audio = audioRef.current;
    setDuration(audio.duration);
    setCurrentTime(e.target.currentTime);
  };

  const handleLoadMetadata = (e) => {
    setDuration(e.target.duration);
  };

  const handleSeekChange = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };
  return (
    <div className="w-full flex items-center gap-2 py-2 px-3 rounded-md bg-slate-100">
      <audio
        ref={audioRef}
        src={file.url}
        controls
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadMetadata}
        className="hidden"
      />

      <button onClick={togglePlayPause}>
        {isPlaying && <Pause className="w-6 text-slate-600" />}
        {!isPlaying && <Play className="w-6 text-slate-600" />}
      </button>
      {showVolume && (
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      )}
      <input
        type="range"
        className="flex-1"
        min="0"
        max={duration}
        step="0.01"
        value={currentTime}
        onChange={handleSeekChange}
      />
    </div>
  );
};
export default CustomAudioPlayer;