import React from "react";
import { token } from "../../../declarations/token"

function Faucet() {

  async function handleClick(event) {
    await token.payOut()
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free MooDeng tokens here! Claim 10,000 DENG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick}>
          Gimme gimme
        </button>
      </p>
    </div>
  );
}

export default Faucet;
