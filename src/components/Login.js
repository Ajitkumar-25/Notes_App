import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    console.log("login form submitted");
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.authtoken) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      // console.log("logged in");
    } else {
      alert("Invalid credentials");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1 className="my-3">Login to continue</h1>
      <form onSubmit={handlesubmit}>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-1"
            id="email"
            name="email"
            value={credentials.email}
            placeholder="Enter email"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-1"
            id="password"
            name="password"
            value={credentials.password}
            placeholder="Password"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <button type="submit" className="btn btn-success my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
