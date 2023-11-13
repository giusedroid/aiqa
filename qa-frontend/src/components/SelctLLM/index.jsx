import React, { useState } from "react";
import { Fieldset, CheckboxField, Button } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

const SelctLLM = ({ llms, setLlms, prompts }) => {

    console.log(llms)

    const llms_list = [
        {name:"amazon-titan", dipslay:"Amazon Titan"},
        {name:"jurassic-2-ultra", dipslay: "Jurassic-2 Ultra"},
        {name:"jurassic-2-mid", dipslay: "Jurassic-2 Mid"},
        {name:"anthropic.claude-v2", dipslay: "Claude 2"},
        {name:"anthropic.claude-v1", dipslay: "Claude 1.3"},
        {name:"anthropic.claude-instant-v1", dipslay: "Claude Instant"},
        {name:"command", dipslay: "Command"},
        {name:"llama-2-13b-chat", dipslay: "Llama-2-13b-chat"},
        {name:"llama-2-70b-chat", dipslay: "Llama-2-70b-chat"},
        {name:"sd-xl-1", dipslay: "Stable Diffusion XL 1.0"},
        {name:"sd-xl-0-8", dipslay: "Stable Diffusion XL 0.8"}
    ]

    const setChecked = (e) => (
        setLlms([...llms,e.target.name])
        
    );

    const makeRequest = e => {


const requests = []

const connectionId = window.connectionId

for (let prompt of prompts.split("\n")){
    for (let model of llms){
        requests.push({
            query: prompt, model,
            connectionId, queryId: `${100 * Math.random()}`
        })
    }
}

const totalRequests = requests.length; // Total number of requests to make
const timeSpan = 5000; // Time span over which to stagger the requests (in milliseconds)

const staggeredRequests = Array.from({ length: totalRequests }, (_, index) => {
  // Calculate delay for each request to evenly distribute over the time span
  const delay = (timeSpan / totalRequests) * index;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Making request ${index + 1} of ${totalRequests}`);
      console.log(requests[index]);
      console.log(requests[index].query);
      console.log(requests[index].model);
      console.log(requests[index].connectionId);
      console.log(requests[index].queryId);
      console.log(delay)

      // Make the HTTP request using fetch
      fetch('https://ja58uefvad.execute-api.us-west-2.amazonaws.com/send', {
        method: 'POST',
        body: JSON.stringify( {
            MessageBody: requests[index]
            // MessageBody: {
            //     "query": "What models are available in Amazon Bedrock?",
            //     "queryId": "1",
            //     "model": "anthropic.claude-instant-v1",
            //     "connectionId": "OQlCac8jvHcCHIA="
            // }
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      })
        .then(response => response.text()) // Convert response to JSON (assuming a JSON response)
        .then(data => console.log(data) || resolve(data)) // Resolve the promise with the response data
        .catch(error => console.log(error) || reject(error)); // Reject the promise if there's an error
    }, delay);
  });
});

// Use Promise.all to execute all requests
Promise.all(staggeredRequests)
  .then(results => {
    console.log('All requests completed:', results);
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });

    }

    return(
        <>
            <Fieldset
            legend="Select the models that you want to test"
            variation="outlined"
            direction="column">
                {llms_list.map(model => (
                    <CheckboxField
                    key={model.name}
                    label={model.dipslay}
                    name={model.name}
                    onChange={setChecked}
                />
                ))}
            </Fieldset>
            <Button onClick={makeRequest}><Link to={"/proc"}>Press Here To Continue</Link></Button>
        </>
    );
};

export default SelctLLM;