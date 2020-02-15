import React, { createRef, useState } from "react";
import ReactPlayer from "react-player";
import { Box } from "@material-ui/core";

export function VideoCanvas() {
  let videoRef = createRef();
  let canvasRef = createRef();
  let imageRef = createRef();
  let linkRef = createRef();
  const [duration, setDuration] = useState();

  const captureFrame = () => {
    let video = videoRef.current.getInternalPlayer();
    let canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvas.getContext("2d").drawImage(video, 0, 0);
    let dataUri = canvas.toDataURL("image/" + "jpeg");

    // Setting image
    linkRef.current.href = dataUri;
    linkRef.current.download = "screenshot";
    imageRef.current.src = dataUri;

    setDuration(videoRef.current.getDuration());

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

        <div style={{ marginTop: 30 }}>
          <b>Click on the Screenshot to download it:</b>
        </div>
        <a href="javascript;" id="link" ref={linkRef}>
          <img id="img" ref={imageRef} src=""/>
        </a>
        <canvas ref={canvasRef} style={{ display: "none" }} alt="" />
      </Box>
    </>
  );
}

export default VideoCanvas;
