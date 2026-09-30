import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

function MiniPlayer({
  className,
  videoRef,
  togglePlay,
}: {
  className: string;
  videoRef: React.RefObject<HTMLVideoElement> | null;
  togglePlay: () => void;
}) {
  return (
    <>
      <video ref={videoRef} className={className} />
      <Button onClick={togglePlay}>
        <Play aria-hidden="true" />
        Play
      </Button>
    </>
  );
}

export default MiniPlayer;
