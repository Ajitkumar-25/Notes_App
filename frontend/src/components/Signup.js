import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    console.log("login form submitted");
    const response = await fetch("https://notes-app-l28p.onrender.com/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.authtoken) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/");
      props.showAlert(" Account created succesfully", "success");
      
      // console.log("logged in");
    } else {
      props.showAlert("invalid credentials", "danger");
    }
  };
  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <h1>Signup to continue</h1>
      <form onSubmit={handlesubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control border-2 border-success"
            id="name"
            placeholder="Enter Name"
            onChange={onchange}
            name="name"
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control border-2 border-success"
            id="email"
            placeholder="Enter email"
            onChange={onchange}
            name="email"
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control border-2 border-success"
            id="password"
            placeholder="Password"
            onChange={onchange}
            name="password"
            minLength={5}
            required
          />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input
            type="password"
            className="form-control border-2 border-success"
            id="cpassword"
            placeholder="cpassword"
            onChange={onchange}
            name="cpassword"
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

export default Signup;
