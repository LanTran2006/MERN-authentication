import React, { useEffect, useState } from 'react'
import { useStore } from '../store/Authstore'
import { isValidEmail } from '../helper/checker';

function Home() {
  const {user,editUser,logoutUser}=useStore();
  const [name,setName]=useState(user?.username);
  const [mail,setMail]=useState(user?.email);
  const [error,setError]=useState({
    email: "",
    name: ""
  })
  const [editing,setEditting]=useState({
    name: false,
    mail: false
  })
  useEffect(()=>{
      setName(user?.username);
      setMail(user?.email);
  },[user])
  const handle_edit=(e: React.MouseEvent<HTMLButtonElement>)=>{
    let id=e.currentTarget.id;
    if (id=="name") {
      if (editing.name) setName(user?.username);
      setEditting({...editing,name: !editing.name})
    } else {
      if (editing.mail) setMail(user?.email);
      setEditting({...editing,mail: !editing.mail})
    }
  }
  const handle_change=async ()=>{
    if (!editing.mail && !editing.name) {
      return
   }
    const tmp={
      email: "",
      name: ""
    }
     if (!name) {
        tmp.name="this is required"
     }
     if (!isValidEmail(mail || "")) {
         tmp.email="invalid email"
     }
     if (!mail) {
        tmp.email="this is required"
     }
     if (Object.values(tmp).some(item=>item)) {
          setError(tmp);
          return;
     } 
     setError(tmp);
     await editUser({name,mail});
     setEditting({
      name: false,
      mail: false
    })
  }
  const handle_logout=()=>{
      logoutUser();
  }
  return (
    <section className='home'>
        <h2>Dashboard</h2>
        <b>profile infomation</b>
         <p>name:</p>
         <input disabled={!editing.name} onChange={e=>setName(e.target.value)} value={name} type="text" />
         <button id='name' onClick={handle_edit}>{editing.name ? "undo" : "change name"}</button>
         {error.name && <p className="error"><b>{error.name}</b></p>}
         <p>email:</p>
         <input disabled={!editing.mail} onChange={e=>setMail(e.target.value)} value={mail} type="text" />
         <button id='mail' onClick={handle_edit}>{editing.mail ? "undo" : "change email"}</button>
         {error.email ? <p className="error"><b>{error.email}</b></p> : <br/>}
         <button onClick={handle_change} className='edit'>edit profile</button>
         <button onClick={handle_logout}>logout</button>
    </section>
  )
}

export default Home