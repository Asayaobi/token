import ReactDOM from 'react-dom'
import React from 'react'
import App from "./components/App"
import { AuthClient } from '../../../node_modules/@dfinity/auth-client/lib/cjs/index'


const init = async () => { 
  const authClient = await AuthClient.create()
  
  //check if the user has already logged in before
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient)
  } else {
    //if the user has never logged in before
     await authClient.login({
    identityProvider: "https://identity.ic0.app/#authorize",
    //once it's successfully authenticated, take the user to the main app
    onSuccess: () => {
      handleAuthenticated(authClient)
    }
  })
  }
}

async function handleAuthenticated(authClient) {
  //log authClient in the frontend
  console.log(authClient.getIdentity())

  //get user's principal from getIdentity()
  const identity = await authClient.getIdentity()
  const userPrincipal = identity._principal.toString()
  console.log(userPrincipal)

  //render the website
  ReactDOM.render(<App loggedinPrincipal={userPrincipal}/>, document.getElementById("root"))
}

init()


