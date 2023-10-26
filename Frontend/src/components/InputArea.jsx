import React, { useEffect, useState } from "react";
import "./InputArea.css";
import axios from "axios";

export default function InputArea(props) {
  const [disable, setDisabled] = useState(false);
  useEffect(() => {
    props.setGenerate(disable);
  }, [disable]);
  const handleInput = async () => {
    setDisabled(true);
    props.setResponse(await callToGPT(props.prompt));
    setDisabled(false);
  };
  return (
    <div className="inputArea">
      <input
        type="text"
        placeholder="Enter your prompt here."
        value={props.prompt}
        onChange={(e) => props.setPrompt(e.target.value)}
        onKeyUp={(e) => {
          if (e.key == "Enter") handleInput();
        }}
      />
      <button
        className="go-button"
        onClick={async () => {
          setDisabled(true);
          props.setResponse(await callToGPT(props.prompt));
          setDisabled(false);
        }}
        disabled={disable}
      ></button>
    </div>
  );
}

async function callToGPT(prompt) {
  if (!prompt) return "Empty Prompt";
  try {
    const response = await axios.post(
      "https://chatty-server-2xu5.onrender.com/chat",
      {
        prompt: prompt,
      },
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.data.output;
  } catch (e) {
    console.log(e);
  }
}
