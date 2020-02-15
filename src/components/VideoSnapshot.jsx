import React, { createRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button, Box } from "@material-ui/core";

export function VideoCanvas() {
  let videoRef = createRef();
  let canvasRef = createRef();
  let imageRef = createRef();
  let linkRef = createRef();
  const [duration, setDuration] = useState();
  const [snapshotTime, setsnapshotTime] = useState();

  const captureFrame = () => {
    const video = videoRef.current
    const videoPlayer = video.getInternalPlayer();
    const canvas = canvasRef.current;
    canvas.width = videoPlayer.videoWidth;
    canvas.height = videoPlayer.videoHeight;
        canvas.getContext("2d").drawImage(videoPlayer, 0, 0);
        let dataUri = canvas.toDataURL("image/" + "jpeg");
        // Setting image
        linkRef.current.href = dataUri;
        linkRef.current.download = "screenshot";
        imageRef.current.src = dataUri;

      setsnapshotTime(video.getCurrentTime());
      setDuration(video.getDuration());
  };

  return (
    <>
      <Box
        style={{ marginTop: 30 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <ReactPlayer
          id="video"
          ref={videoRef}
          url="https://cdn.rawgit.com/mediaelement/mediaelement-files/4d21a042/big_buck_bunny.mp4"
          controls
          onStart={captureFrame}
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous"
              }
            }
          }}
        />
        <div>
          <b> Duration of the video in seconds: </b>
          {duration}
        </div>
          <div>
          <b>Time at which snapshot was taken(seconds): </b> {snapshotTime}

          </div>
        <div style={{ marginTop: 30 }}>
          <b>Click on the Screenshot to download it:</b>
        </div>
        <a href="javascript;" id="link" ref={linkRef}>
          <img id="img" ref={imageRef} src="" alt="screenshot" />
        </a>
        <canvas ref={canvasRef} style={{ display: "none" }} alt="" />
      </Box>
    </>
  );
}

export default VideoCanvas;