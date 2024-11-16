import React, { useRef } from "react";
import YouTube from "react-youtube";
import "./Video.scss";

function Video({ videoId, playerRef, onReady}) {
  return (
    <div className="container-preview-introduction-video__content-video">
      <YouTube
        ref={playerRef}
        videoId={videoId}
        onReady={onReady}
        style={{
          width: "100%",
        }}
      />
    </div>
  );
}

export default Video;
