 import React from "react";

 const Stream = () => {

  return (
    <iframe
    title="Predictions from Streamlit App"
    src="http://localhost:8501" //local deployment http://localhost:8504  https://predictions-stream-72nfnln4bb.streamlit.app/
    style={{
      border: 0,
      width: "100%", // Set the width to 100% of its container
      height: "600px", // Set the height to 500px
    }}

    />
  )
 }

 export default Stream;