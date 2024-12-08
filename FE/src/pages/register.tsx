import React, { useState } from "react";
import { Link } from "react-router-dom";
import Checker from "../components/Checker";
import { isValidEmail} from "../helper/checker";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/Authstore";
function Register() {
  const {signUp}=useStore()
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    pass: "",
  });
  const [error,setError]=useState({
    name: "",
    email: "",
    pass: "",
  })
  const navigate=useNavigate();
  let handle_submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let tmp={
      name:"",
      email: "",
      pass: "",
    }
    if (!detail.email) {
       tmp.email="this is required"
    } else if (!isValidEmail(detail.email)) {
      tmp.email="invalid email"
    }
    if (!detail.name) {
       tmp.name="this is required"
    }
    if (!detail.pass) {
      tmp.pass="this is required"
   }
   if (Object.values(tmp).every(item=>!item)) {
      signUp(detail,navigate)
   } else {
      setError(tmp);
   }
  };
  return (
    <form onSubmit={handle_submit}>
      <h2>Create Account</h2>
      <label htmlFor="#name">Full Name</label>
      <input
        onChange={(e) => setDetail({ ...detail, name: e.target.value })}
        placeholder="Full Name"
        id="#name"
        type="text"
      />
      {error.name ? <p className="error"><b>{error.name}</b></p> : <br/>}
       
      <label htmlFor="#email">email</label>
      <input
        onChange={(e) => setDetail({ ...detail, email: e.target.value })}
        placeholder="Email Address"
        id="#email"
        type="text"
      />
      {error.email ? <p className="error"><b>{error.email}</b></p> : <br/>}
      
      <label htmlFor="password">password</label>
      <input
        value={detail.pass}
        onChange={(e) => setDetail({ ...detail, pass: e.target.value })}
        placeholder="password"
        id="password"
        type="text"
      />
      {error.pass ? <p className="error"><b>{error.pass}</b></p> : <br/>}
      <Checker password={detail.pass} />
      <button>Sign Up</button>
      <p>
        Already have an account? <Link to={"/login"}>login</Link>
      </p>
    </form>
  );
}

export default Register;
