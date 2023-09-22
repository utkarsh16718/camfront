import { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";

const Screen = () => {
    const [recording, setrecording] = useState(false)

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ screen: true });

    const handelClick=()=>{
        startRecording()
        setrecording(true)

    }
    const handelClick1=()=>{
        stopRecording()
        setrecording(false)

    }

  return (
    <div>
      <p>{status}</p>
    
      {
        recording? <button onClick={handelClick1}>Stop Recording</button>: <button onClick={handelClick}>Start Recording</button>
      }
      <video src={mediaBlobUrl} height={"300px"} width={"300px"} controls  loop />
    </div>
  );
};

export default Screen 