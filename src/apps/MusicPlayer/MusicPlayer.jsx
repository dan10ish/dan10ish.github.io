import React, { useState, useRef, useEffect } from "react";
import { Play, Pause } from "lucide-react";
import "./MusicPlayer.css";
const albumArt = "/assets/music/soundtrack-cover.jpg";
const songFile = "/assets/music/soundtrack.mp3";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            setIsPlaying(false);
        };

        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, []);

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player">
            <div className="album-art-container">
                <img src={albumArt} alt="Album Art" className="album-art" />
            </div>

            <div className="player-controls">
                <button
                    className="play-pause-button"
                    onClick={togglePlayPause}
                >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>
            </div>

            <audio ref={audioRef} preload="metadata">
                <source src={songFile} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MusicPlayer;