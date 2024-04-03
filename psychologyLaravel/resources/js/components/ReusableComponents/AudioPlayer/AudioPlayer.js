import React, { useEffect, useState, useRef } from 'react';
import styles from './audioplayer.module.css';

const AudioPlayer = (props) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(props.audioPath)); // Path to your audio file

    const playAudio = () => {
        if (!isPlaying) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
        setIsPlaying(!isPlaying);
      };
    
      useEffect(() => {
        // Cleanup when the component unmounts
        return () => {
          audioRef.current.pause();
        };
      }, []);

    return (
        <div>
            <button onClick={playAudio} className={styles.audioBtn}>
                {isPlaying ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                        <rect x="15" y="15" width="8" height="20" fill="#7758df" />
                        <rect x="27" y="15" width="8" height="20" fill="#7758df" />
                    </svg>
                : 
                                    
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
                    <circle cx="25" cy="25" r="23" fill="#7758df" />
                    <path d="M20,15 L20,35 35,25 Z" fill="white" />
                </svg>
                }
            </button>
        </div>
    );
};

export default AudioPlayer;
