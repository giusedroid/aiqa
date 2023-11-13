import React, { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

// (1) import components from Amplify UI
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify, Auth, Storage } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

// Custom Components
import Header from './components/Header';
import Rag from './components/Rag';
import Prompt from "./components/Prompt";
import SelctLLM from "./components/SelctLLM";
import Processing from "./components/Processing";

// (3) get basic styles from Amplify UI
import '@aws-amplify/ui-react/styles.css';


const endpoint = "wss://lznx14xqr5.execute-api.us-west-2.amazonaws.com/Prod"

let socket



function testCall(setSocketID) {
  const payload = {
    action: 'message',
    msg: 'Test'
  }
  socket.send(JSON.stringify(payload))
}

try{
  socket = new WebSocket(endpoint)
}catch(error){
  console.log(error)  
}

socket.addEventListener('open', e => {
  console.log('WebSocket is connected', e)
  testCall()
})

socket.addEventListener('close', e => {
  console.log('WebSocket is closed')
})

socket.addEventListener('error', e => {
  console.error('WebSocket is in error', e)
})

socket.addEventListener('message', e => {

  const {connectionId} = JSON.parse(e.data)
  console.log('WebSocket received a message:', e)
  console.log('Your answer is:', JSON.parse(e.data).message)
  Storage.put("websocket.json", JSON.stringify({connectionId}), {
    level: "private",
    contentType: "text/plain"
  });
  window.connectionId = JSON.stringify({connectionId})

})



export default function App() {
  const [webhook, setWebhook] = useState(true)
  const [webhookmsg, setWebhookmsg] = useState([])
  const [promts, setPropmts] = useState()
  const [llms, setLlms] = useState([])

  return (

    <Authenticator>
      {({ signOut, user }) => (
        <Router>
          <Header user={user} signOut={signOut} />
          <Routes>
            <Route path="/" element={<Rag webhookState={webhook}/>} />
            <Route path="/prompt" element={<Prompt promts={promts} setPropmts={setPropmts}/>} />
            <Route path="/llms" element={<SelctLLM llms={llms} setLlms={setLlms} prompts={promts}/>} />
            <Route path="/proc" element={<Processing websocketMsg={webhookmsg} />} />
          </Routes>
        </Router>
      )}
    </Authenticator>

  );
}