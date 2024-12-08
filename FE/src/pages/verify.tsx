import React, { useEffect, useState } from "react";
import { useStore } from "../store/Authstore";
import { useNavigate } from "react-router-dom";

function Verify() {
  const {verify}=useStore()
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [current, setCurrent] = useState(0);
  const navigate=useNavigate()
  let valid = code.every((val) => val);
  let handle_enter = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const inputValue = e.target.value;
    if (index != current) return;

    setCode((prev) => {
      let list = [...prev];
      let j = 0;
      for (let i = index; i < 6 && j < inputValue.length; i++) {
        list[i] = inputValue[j++];
      }
      if (!inputValue) list[index] = "";
      return list;
    });
    setCurrent(Math.min(index + inputValue.length, 5));

  };
  const handle_key = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key == "Backspace" && !code[index]) {
      setCode(
        code.map((val, idx) => (idx == Math.max(0, index - 1) ? "" : val))
      );
      setCurrent(Math.max(0, index - 1));
      return;
    }
  };
  useEffect(() => {
    if (current < code.length) {
      document.querySelectorAll("input")[current].focus();
    }
  }, [current]);
  return (
    <section className="verify">
      <h2>Verify Your Email</h2>
      <p>Enter the 6-digit code sent to your email address.</p>
      <div className="inp">
        {code.map((val, idx) => (
          <input
            onKeyDown={(e) => handle_key(e, idx)}
            disabled={idx > current}
            onChange={(e) => handle_enter(e, idx)}
            value={val}
            key={idx}
            type="text"
          />
        ))}
      </div>
      <button onClick={()=>verify(code.join(""),navigate)} disabled={!valid}>Verify Email</button>
    </section>
  );
}

export default Verify;
