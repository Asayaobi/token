import React, { useState } from "react";
import {Principal} from "@dfinity/principal"
import {token} from "../../../declarations/token"

function Balance() {

  const [inputValue, setInput] = useState("")
  
  async function handleClick() {
    console.log(inputValue);
    //convert inputValue as Principal type in order to use with balanceOf()
    const principal = Principal.fromText(inputValue)
    const balance = await token.balanceOf(principal)
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          // when the user type in the input, onchange will trigger setInput function to set inputValue
          onChange={(e)=> setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of XYZ.</p>
    </div>
  );
}

export default Balance;
