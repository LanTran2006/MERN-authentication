import React, { useState } from "react";
import { Link } from "react-router-dom";
import { isValidEmail } from "../helper/checker";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/Authstore";
function Login() {
  const {loginUser}=useStore();
  const [detail, setDetail] = useState({
    email: "",
    pass: "",
  });
  const [error,setError]=useState({
    email: "",
    pass: "",
  })
  let navigate=useNavigate()
  let handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tmp={
      email: "",
      pass: "",
    }
    if (!detail.email) {
       tmp.email="this is required"
    } else if (!isValidEmail(detail.email)) {
      tmp.email="invalid email"
    }
    if (!detail.pass) {
      tmp.pass="this is required"
   }
   if (Object.values(tmp).every(item=>!item)) {
    loginUser(detail,navigate)
 } else {
    setError(tmp);
 }
   
  };
  return (
    <form onSubmit={handle_submit} className="login">
      <h2>Welcome Back</h2>
      <label htmlFor="#email">email</label>
      <input
        onChange={(e) => setDetail({ ...detail, email: e.target.value })}
        placeholder="Email Address"
        id="#email"
        type="text"
      />
      {error.email && <p className="error"><b>{error.email}</b></p>}
      <br />
      <label htmlFor="password">password</label>
      <input
        onChange={(e) => setDetail({ ...detail, pass: e.target.value })}
        placeholder="password"
        id="password"
        type="text"
      />
      {error.pass && <p className="error"><b>{error.pass}</b></p>}
      <p>
        <Link to={"/forgot"}>forgot password</Link>
      </p>
      <button>login</button>
      <p>
        Don't have an account? <Link to={"/register"}>sign up</Link>{" "}
      </p>
    </form>
  );
}

export default Login;
