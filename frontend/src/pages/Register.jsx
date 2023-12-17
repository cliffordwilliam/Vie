import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setTargetPage } from "../store/curtainSlice";
import { setContent } from "../store/modalSlice";
import c from "../c";
import axios from "axios";

export default function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      username: formData.username,
      password: formData.password,
    };
    try {
      dispatch(setContent({ content: "Loading...", isOn: true }));
      const res = await axios.post(`${c.backendBaseUrl}/user`, body);
      dispatch(setContent({ content: res.data.msg, isOn: true }));
    } catch (error) {
      dispatch(
        setContent({ content: error.response.data.error.msg, isOn: true })
      );
    }
  };

  return (
    <main className="cc">
      <div className="v-flex panel">
        <h1 className="t">Register Form</h1>
        <form className="v-flex mt" onSubmit={handleSubmit}>
          <label className="h-flex">
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>
          <label className="h-flex">
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <hr />
        <button
          onClick={(e) => {
            e.preventDefault();
            dispatch(setTargetPage("/login"));
          }}
        >
          Login
        </button>
      </div>
    </main>
  );
}
