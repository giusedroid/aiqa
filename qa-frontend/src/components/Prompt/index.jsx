import React, { useState } from "react";
import { TextAreaField, Button } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';

const Prompt = ({ promts, setPropmts }) => {
    

    const handleChange = (e) => (
        setPropmts(e.target.value)
    );

    return(
        <>
            <TextAreaField
            descriptiveText="Enter all the prompts to analyse, one per line"
            label="List Of Prompts"
            name="list_prompts"
            placeholder="What is the meaning of life?"
            rows={3}
            onChange={handleChange}/>
            <Button><Link to={"/llms"}>Press Here To Continue</Link></Button>
        </>
    );
};

export default Prompt;