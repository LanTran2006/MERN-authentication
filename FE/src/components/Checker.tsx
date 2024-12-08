import React from "react";


interface props {
    password: string
}
function validate(count: number) {
   if (count<2) return "very weak";
   if (count==2) return "weak";
   if (count==3) return "fair";
   if (count==4) return "good";
    return "strong";
}
function getcolor(count: number,index: number) {
    if (count && count<=2) {
        if (index==0) return "active";
        return "";
    } else {
        if (index<count-1) return "active";
        return "";
    }
}

function Checker({ password }: props) {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[^A-Za-z0-9]/.test(password) },
  ];
  let count=criteria.reduce((acc,curr)=>curr.met ? acc+1 : acc,0);
  return (
    <div>
     <header>
        <p>password strength</p>
        <p>{validate(count)}</p>
     </header>
     <div className="range">
        {Array(4).fill(0).map((_,idx)=><div key={idx} className={getcolor(count,idx)}></div>)}
     </div>
      {criteria.map(({ label,met},idx) => (
        <li key={idx}>
          {met ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-x"></i>} {label}
        </li>
      ))}
    </div>
  );
}

export default Checker;
