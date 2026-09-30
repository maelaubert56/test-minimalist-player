import { Button } from "@/components/ui/button";
import usePlayer from "@/hook/usePlayer";
import { Pause, Play, Volume2 } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Slider } from "@/components/ui/slider";
import { formatTime } from "@/lib/utils";
import { useState } from "react";

function MiniPlayer({ videoUrl }: { videoUrl: string }) {
  const {
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
  } = usePlayer(videoUrl);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);

  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="relative aspect-video bg-black">
        <video ref={videoRef} className="h-full w-full object-contain" />
        {isLoading && (
          <div className="absolute inset-0 grid place-items-center">
            <Spinner className="size-10 text-white" />
          </div>
        )}
      </div>

      <div className="flex p-4 items-center gap-3">
        <Button onClick={togglePlay} size="icon" disabled={!isReady}>
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <div className="flex-1">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <Slider
            value={currentTime}
            max={duration}
            disabled={!isReady}
            onValueChange={(value) => seekTo(value as number)}
          />
        </div>
        <div className="relative">
          {isVolumeOpen && (
            <div className="absolute bottom-full right-0 z-10 mb-2 rounded-md border bg-popover p-2 shadow-md">
              <Slider
                className="data-vertical:h-20 data-vertical:w-6"
                orientation="vertical"
                value={volume}
                step={0.01}
                max={1}
                disabled={!isReady}
                onValueChange={(value) => setVolume(value as number)}
              />
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVolumeOpen((open) => !open)}
            disabled={!isReady}
          >
            <Volume2 />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default MiniPlayer;
