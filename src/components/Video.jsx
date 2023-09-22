
import { useReactMediaRecorder } from "react-media-recorder";
import VideoRecorder from "react-video-recorder";
import {
  RecordWebcam,
  useRecordWebcam,
} from "react-record-webcam";
import { useState } from "react";
import axios from "axios";

const OPTIONS = {
  filename: "test-filename",
  fileType: "mp4",
  width: 1920,
  height: 1080
};

export default function Video() {

  const [id, setid] = useState()
  const [values, setValues] = useState()

  const recordWebcam = useRecordWebcam(OPTIONS);


  const getRecordingFileHooks = async () => {
    const blob = await recordWebcam.getRecording();
    console.log(blob);

  };


  const getRecordingFileRenderProp = async (blob) => {
    console.log({ blob });
  }



  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    screen: true,
  });

  const startRecording1 = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/startrecording`, {
        userId: "Demo Id",
        startTime: Date.now()
      })
      console.log(res.data._id)
      if (res.status === 201) {
        setid(res.data._id)
      }
    }
    catch (error) {
      window.alert(error.response.data)
    }
    startRecording()
  }
  const startRecording2 = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://localhost:3000/startrecording`, {
        userId: "Demo Id",
        startTime: Date.now()
      })
      console.log(res.data._id)
      if (res.status === 201) {
        setid(res.data._id)
      }
    }
    catch (error) {
      window.alert(error.response.data)
    }
    recordWebcam.start()
  }
  const stoprecording1 = async () => {
    
    try {
      const res1 = await axios.put(`http://localhost:3000/stoprecording`, {
        _id: id,
        endTime: Date.now(),
        fileSize: 134,
        fileName: " Demo File Name",
        status: "Recording Completed"
      });
      if (res1.status === 201) {
        console.log(res1)
      }
    }
    catch (error) {
      window.alert(error.response.data)
    }
    
    stopRecording()
  };

  const stoprecording2 = async () => {
  
    try { 
      const res1 = await axios.put(`http://localhost:3000/stoprecording`, {
        _id: id,
        endTime: Date.now(),
        fileSize: 134,
        fileName: " Demo",
        status: "Recording Completed"
      });
      if (res1.status === 201) {
        console.log(res1)
      }
    }
    catch (error) {
      window.alert(error.response.data)
    }
    recordWebcam.stop()

  };




  return (
    <div>
      <h1>Record your video</h1>
      <p>Camera status: {recordWebcam.status}</p>
      <div>
        <button
          onClick={recordWebcam.open}
        >
          Open camera
        </button>
        <button
          disabled={
            recordWebcam.status === "CLOSED" ||
            recordWebcam.status === "PREVIEW"
          }
          onClick={recordWebcam.close}
        >
          Close camera
        </button>
        <button
          disabled={

            status === "recording" || status === "acquiring_media"
          }
          onClick={startRecording1}>Start Screen Recording</button>

        <button disabled={
          status === "idle" || status === "stopped"


        } onClick={stoprecording1}>Stop Screen Recording</button>
        <button
          disabled={
            recordWebcam.status === "CLOSED" ||
            recordWebcam.status === "RECORDING" ||
            recordWebcam.status === "PREVIEW"
          }
          onClick={startRecording2}
        >
          Start recording
        </button>
        <button
          disabled={recordWebcam.status !== "RECORDING"}
          onClick={stoprecording2}
        >
          Stop recording
        </button>
        <button
          disabled={recordWebcam.status !== "PREVIEW"}
          onClick={recordWebcam.retake}
        >
          Retake
        </button>
        <button
          disabled={recordWebcam.status !== "PREVIEW"}
          onClick={recordWebcam.download}
        >
          Download
        </button>
        <button
          disabled={recordWebcam.status !== "PREVIEW"}
          onClick={getRecordingFileHooks}
        >
          Get recording
        </button>
      </div>

      <video
        ref={recordWebcam.webcamRef}
        style={{
          display: `${recordWebcam.status === "OPEN" ||
            recordWebcam.status === "RECORDING"
            ? "block"
            : "none"
            }`
        }}
        height={"200px"} width={"200px"}
        autoPlay
        muted
      />
    </div>
  );
}
