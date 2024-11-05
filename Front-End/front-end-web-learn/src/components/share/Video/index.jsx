import React, { useRef } from 'react'
import YouTube from 'react-youtube'
import "./Video.scss"

function Video({ videoId }) {

    const playerRef = useRef(null); // Tạo ref để truy cập vào player

    const onReady = (event) => {
        alert("hello")
        playerRef.current = event.target;
    }
    const playVideo = () => {
        if (playerRef.current) {
            playerRef.current.playVideo();
        } else {
            console.error('Player not initialized');
        }
    };

    const pauseVideo = () => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
        } else {
            console.error('Player not initialized');
        }
    };

    return (
        <div className="container-preview-introduction-video__content-video">
            <YouTube videoId={videoId} style={{
                width: "100%"
            }} />
        </div>
    )
}

export default Video
