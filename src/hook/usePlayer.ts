import RxPlayer from "rx-player";
import { useEffect, useRef, useState } from "react";

function usePlayer(videoUrl: string) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playerRef = useRef<RxPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement == null) return;

    const player = new RxPlayer({ videoElement });
    playerRef.current = player;
    player.setVolume(volume);

    player.loadVideo({
      url: videoUrl,
      transport: "directfile",
      autoPlay: false,
    });

    player.addEventListener("error", (err) => {
      console.log("player error", err);
    });

    player.addEventListener("playerStateChange", (state) => {
      if (state !== "STOPPED" && state !== "LOADING" && state !== "RELOADING") {
        setIsReady(true);
      } else {
        setIsReady(false);
      }

      if (
        state === "LOADING" ||
        state === "RELOADING" ||
        state === "BUFFERING" ||
        state === "SEEKING" ||
        state === "FREEZING"
      ) {
        setIsLoading(true);
      } else {
        setIsLoading(false);
      }
    });

    player.addEventListener("positionUpdate", ({ position, duration }) => {
      setCurrentTime(position);

      if (Number.isFinite(duration)) {
        setDuration(duration);
      }
    });
  }, []);

  const togglePlay = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isPaused()) {
      player.play();
      setIsPlaying(true);
    } else {
      player.pause();
      setIsPlaying(false);
    }
  };

  const seekTo = (time: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo({ position: time });
  };

  const setVolume = (volume: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.setVolume(volume);
    setVolumeState(volume);
  };

  return {
    isReady,
    isLoading,
    isPlaying,
    videoRef,
    togglePlay,
    currentTime,
    duration,
    seekTo,
    volume,
    setVolume,
  };
}

export default usePlayer;
