import React, { useState } from "react";
import {Principal} from "@dfinity/principal"
import {token} from "../../../declarations/token"

function Balance() {

  const [inputValue, setInput] = useState("")
  const [balanceResult, setBalance] = useState("")
  
  async function handleClick() {
    // console.log(inputValue);
    //1. call balanceOf() from backend token canister
    //convert inputValue as Principal type in order to use with balanceOf()
    const principal = Principal.fromText(inputValue)
    const balance = await token.balanceOf(principal)

    //2. display the result as balanceResult
    //the balance from backend is passed as Natural number format eg. 1_000_000_000
    //we have to convert it to the string with toLocaleString method
    setBalance(balance.toLocaleString())
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
      <p>This account has a balance of {balanceResult}.</p>
    </div>
  );
}

export default Balance;
