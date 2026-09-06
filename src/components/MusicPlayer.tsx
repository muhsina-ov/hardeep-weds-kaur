import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export default function MusicPlayer({ autoPlay = false }: { autoPlay?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // Load YouTube IFrame Player API if not already present
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;
      try {
        playerRef.current = new window.YT.Player("youtube-audio-player", {
          height: "1",
          width: "1",
          videoId: "bLYlTJgvLBw",
          playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: "bLYlTJgvLBw",
            controls: 0,
            showinfo: 0,
            autohide: 1,
            modestbranding: 1,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              if (autoPlay) {
                try {
                  event.target.playVideo();
                  setIsPlaying(true);
                } catch {
                  /* autoplay block handled */
                }
              }
            },
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            },
          },
        });
      } catch {
        /* player init handled */
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      try {
        if (playerRef.current && playerRef.current.destroy) {
          playerRef.current.destroy();
        }
      } catch {
        /* cleanup handled */
      }
    };
  }, []);

  useEffect(() => {
    if (autoPlay && playerRef.current && playerRef.current.playVideo) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
      } catch {
        /* autoplay error */
      }
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    } catch {
      /* playback error */
    }
  };

  return (
    <>
      <div className="hidden pointer-events-none opacity-0" aria-hidden="true">
        <div id="youtube-audio-player" />
      </div>

      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-[#f2c4d0]/40 bg-[#2a1830]/90 text-[#faf3eb] shadow-[0_8px_30px_rgba(196,90,122,0.4)] backdrop-blur-md transition-transform duration-300 hover:scale-110 active:scale-95"
      >
        <span
          className={`absolute -inset-1 rounded-full bg-gradient-to-r from-[#c45a7a]/40 to-[#c9a86a]/40 blur-sm transition-opacity duration-300 ${
            isPlaying ? "animate-pulse opacity-100" : "opacity-0"
          }`}
        />
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            <Volume2 size={20} className="text-[#f2c4d0]" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2c4d0] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c45a7a]" />
            </span>
          </div>
        ) : (
          <VolumeX size={20} className="text-[#e8dcc8]/70" />
        )}
      </button>
    </>
  );
}
