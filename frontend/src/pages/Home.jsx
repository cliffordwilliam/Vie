import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTargetPage } from "../store/curtainSlice";
import io from "socket.io-client";
import c from "../c";
export default function Home() {
  const dispatch = useDispatch();
  const socket = io.connect(c.backendBaseUrl);
  const [count, setCount] = useState(1);
  useEffect(() => {
    socket.emit("join_room", 1); // use params id of a page for this
  }, []);
  function onSocket(e) {
    e.preventDefault();
    setCount((prevCount) => prevCount + 1);
    let data = { count: count + 1, room: 1 };
    socket.emit("send_message", data);
  }

  useEffect(() => {
    socket.on("receive_message", (newCount) => {
      setCount(newCount);
    });
  }, [count]);

  return (
    <main>
      <div className="v-flex panel">
        <button
          onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem("token");
            dispatch(setTargetPage("/login"));
          }}
        >
          Logout
        </button>
        <button onClick={onSocket}>Socket!</button>
        <p>{count}</p>
        <p>
          TODO: use canvas here{" "}
          <a href="https://www.youtube.com/watch?v=tev71VzEJos">video</a>
        </p>
      </div>
      {/* <Test /> */}
    </main>
  );
}
