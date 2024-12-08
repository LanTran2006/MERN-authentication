import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/Authstore';

function Forgot() {
  let {forgot}=useStore()
  let [mail,setMail]=useState("");
  let handle_submit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
     forgot(mail);
  }
  return (
    <form onSubmit={handle_submit} className='forgot'>
        <h2>Forgot Password</h2>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        <label htmlFor="#email">Email</label>
        <input value={mail} onChange={e=>setMail(e.target.value)} id='#email' type="text" />
        <button>Send Reset Link</button>
        <Link to={'/login'}>Back to Login</Link>
    </form>
  )
}
//If an account exists for {email}, you will receive a password reset link shortly.
export default Forgot