import React from "react";
import { useDispatch } from "react-redux";
import { setTargetPage } from "../store/curtainSlice";
// import Test from "../components/Test";
export default function Home() {
  const dispatch = useDispatch();
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
      </div>
      {/* <Test /> */}
    </main>
  );
}
