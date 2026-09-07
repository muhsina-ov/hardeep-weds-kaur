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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<any>(null);
  const isYouTubeFallback = useRef(false);

  // Initialize YouTube player as fallback
  useEffect(() => {
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
          height: "100",
          width: "100",
          videoId: "oxh9Gtq6VCU",
          playerVars: {
            autoplay: 0,
            loop: 1,
            playlist: "oxh9Gtq6VCU",
            controls: 0,
            showinfo: 0,
            autohide: 1,
            modestbranding: 1,
            enablejsapi: 1,
            origin: window.location.origin,
          },
          events: {
            onStateChange: (event: any) => {
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
              } else if (event.data === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (event.data === window.YT.PlayerState.ENDED) {
                // Ensure loop playback on YouTube fallback
                try {
                  playerRef.current?.seekTo(0);
                  playerRef.current?.playVideo();
                } catch {
                  setIsPlaying(false);
                }
              }
            },
          },
        });
      } catch {
        /* player init error */
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
        /* cleanup */
      }
    };
  }, []);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          isYouTubeFallback.current = false;
        })
        .catch(() => {
          // Fallback to YouTube player if HTML5 audio cannot play
          if (playerRef.current && playerRef.current.playVideo) {
            try {
              playerRef.current.playVideo();
              setIsPlaying(true);
              isYouTubeFallback.current = true;
            } catch {
              /* autoplay blocked */
            }
          }
        });
    } else if (playerRef.current && playerRef.current.playVideo) {
      try {
        playerRef.current.playVideo();
        setIsPlaying(true);
        isYouTubeFallback.current = true;
      } catch {
        /* fallback error */
      }
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (playerRef.current && playerRef.current.pauseVideo) {
      try {
        playerRef.current.pauseVideo();
      } catch {
        /* pause error */
      }
    }
    setIsPlaying(false);
  };

  useEffect(() => {
    if (autoPlay) {
      playAudio();
    }
  }, [autoPlay]);

  const togglePlay = () => {
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  };

  return (
    <>
      {/* Native HTML5 Audio for instant, seamless high-quality audio */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => {});
          }
        }}
      >
        <source src="./assets/song.webm" type="audio/webm" />
        <source src="./assets/song.m4a" type="audio/mp4" />
        <source src="./assets/song.mp3" type="audio/mpeg" />
      </audio>

      {/* YouTube IFrame Player (kept off-screen rather than display:none so API functions properly) */}
      <div
        className="fixed -left-[9999px] -top-[9999px] w-12 h-12 pointer-events-none opacity-0"
        aria-hidden="true"
      >
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
