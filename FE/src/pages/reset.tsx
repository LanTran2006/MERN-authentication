import React, { useState } from 'react'
import { useStore } from '../store/Authstore'
import { useNavigate, useParams } from 'react-router-dom';

function Reset() {
   const {reset}=useStore();
   const {id}=useParams()
   const navigate=useNavigate();
   let [detail,setDetail]=useState({
     pass: "",
     confirmPass: ""
   })
   const [error,setError]=useState({
    confirmPass: "",
    pass: "",
  })
   const handle_set=(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      let tmp={
        confirmPass: "",
        pass: "",
      }
      if (!detail.pass) {
         tmp.pass="this is required";
      } 
      if (!detail.confirmPass) {
         tmp.confirmPass="this is required"
      } else if (detail.confirmPass!=detail.pass) {
        tmp.confirmPass="confirm pass is not match"
     }
     if (Object.values(tmp).every(item=>!item)) {
        reset(detail.pass,id,navigate);
   } else {
      setError(tmp);
   }
   }
  return (
    <form onSubmit={handle_set}>
        <h2>Reset Password</h2>
        <label htmlFor="newpass">Password</label>
        <input value={detail.pass} onChange={e=>setDetail({...detail,pass: e.target.value})} id='newpass' placeholder='New Password' type="text" />
        {error.pass ? <p className="error"><b>{error.pass}</b></p> : <br/>}
        <label htmlFor="confirm">Confirm</label>
        <input value={detail.confirmPass} onChange={e=>setDetail({...detail,confirmPass: e.target.value})} id='confirm' placeholder='Confirm New Password' type="text" />
        {error.confirmPass && <p className="error"><b>{error.confirmPass}</b></p>}
        <button>Set New Password</button>
    </form>
  )
}

export default Reset