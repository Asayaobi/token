import React, { useState } from "react"
import { Principal } from "@dfinity/principal"
import {token} from "../../../declarations/token"

function Transfer() {

  const [recipientId, setId] = useState("")
  const [amountText, setAmountText] = useState("")

  //for button
  const [isDisabled, setDisabled] = useState(false)

  
  async function handleClick() {
    //disable the button when the function is running
    setDisabled(true)
    //convert recipientId to Principal Type
    const recipient = Principal.fromText(recipientId)
    //convert amountText to Nat Type
    const amount = Number(amountText)
    const result = await token.transfer(recipient, amount)

    //when the function is done reset the buton
    setDisabled(false)
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={recipientId}
                onChange={(e)=> setId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amountText}
                onChange={(e) => setAmountText(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" disabled={isDisabled} onClick={handleClick} >
            Transfer
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;
