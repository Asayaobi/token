import React, { useState } from "react";
import { token } from "../../../declarations/token"

function Faucet() {

  const [isDisable, setDisable] = useState(false)

  async function handleClick(event) {
    //when the user call the function, set the button disable
    setDisable(true)
    await token.payOut()
    //once the function is completed, set it back to false
    // setDisable(false)
    //but in this case, let's prevent it so that the same user can't ask for the tokens again
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free MooDeng tokens here! Claim 10,000 DENG tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" disable={isDisable} onClick={handleClick}>
          Gimme gimme
        </button>
      </p>
    </div>
  );
}

export default Faucet;
