import React, { useState } from "react";
import { connectToSocket } from "../util/socket";
import { useNavigate } from "react-router-dom";

const options = ["serverA", "serverB", "serverC"];

const ConnectionForm = () => {
  const [state, setState] = useState({});
  const navigate = useNavigate();

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // console.log("State==========>", state);
    const query = {
      name: state?.name,
      server: state?.server,
      channelName: state?.channelName,
    };
    //Socket connection
    const socket = connectToSocket(query);

    socket.on("connect", () => {
      if (socket?.connected || socket?.id) {
        //Navigate to chat page
        navigate("/client");
      } else {
        console.error("Error in socket connection");
      }
    });

    // console.log("socket=>>>>>>>>>>>", socket?.id);
    // if (socket?.connected || socket?.id) {
    //   //Navigate to chat page
    //   navigate("/client");
    // } else {
    //   console.error("Error in socket connection");
    // }
    //notify that user is connect to this channel to all user of channel
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          placeholder="Write your name"
          value={state?.name}
          onChange={changeHandler}
        />
        <br />
        <select onChange={changeHandler} name="server" value={state?.server}>
          <option>Please choose one option</option>
          {options.map((option, index) => {
            return <option key={index}>{option}</option>;
          })}
        </select>
        <br />
        <input
          type="text"
          name="channelName"
          placeholder="Write channel name"
          onChange={changeHandler}
          value={state?.channelName}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ConnectionForm;
