import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token"
import { AuthClient } from "../../../../node_modules/@dfinity/auth-client/lib/cjs/index";

function Faucet() {

  const [isDisable, setDisable] = useState(false)
  const [buttonText, setButtonText] = useState("Gimme Gimme")

  async function handleClick(event) {
    //when the user call the function, set the button disable
    setDisable(true)

    const authClient = await AuthClient.create()
    const identity = await authClient.getIdentity()

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    })
    let result = await authenticatedCanister.payOut()
    //once the function is completed, set the button text to Already Claimed
    setButtonText(result)
    // setDisable(false)
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
        <button id="btn-payout" disabled={isDisable} onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
