import React, { createRef, useState } from "react";
import ReactPlayer from "react-player";
import { Button, Box, TextField } from "@material-ui/core";

export function VideoCanvas() {
  let videoRef = createRef();
  let canvasRef = createRef();
  let imageRef = createRef();
  let linkRef = createRef();
  const [duration, setDuration] = useState();
  const [seconds, setSeconds] = useState(0);

const captureFrame = () => {
  let video = videoRef.current.getInternalPlayer();
  let canvas = canvasRef.current;
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  videoRef.current.seekTo(seconds, "seconds");
  setTimeout(() => {
    canvas.getContext("2d").drawImage(video, 0, 0);
    let dataUri = canvas.toDataURL("image/jpeg");

    //Setting image
    linkRef.current.href = dataUri;
    linkRef.current.download = "screenshot";
    imageRef.current.src = dataUri;
    setDuration(videoRef.current.getDuration());
  }, 500);
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
        url="Uploads/SampleVideo_1280x720_1mb.mp4"
        controls
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
      <TextField
        id="Seconds"
        label="Seconds"
        type="number"
        onChange={e => setSeconds(e.target.value)}
      />
      <Button
        style={{ marginTop: 30 }}
        variant="contained"
        color="secondary"
        onClick={captureFrame}
      >Take snapshot</Button>
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

