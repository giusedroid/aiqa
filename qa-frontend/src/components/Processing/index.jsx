import { Expander, ExpanderItem } from '@aws-amplify/ui-react';

const Processing = ({ websocketMsg, setter}) => {
    
    const test_list = [
        {msgbody:"wqeqeqwe", msgId:"1"},
        {msgbody:"qweqweqweqweqwe", msgId:"2"},
        {msgbody:"qweqweqweqweqwe", msgId:"3"},
        {msgbody:"qweqweqweqweqweqweqwe", msgId:"4"},
        {msgbody:"qweqweqweqweqweqweqweqweqwe", msgId:"5"},
        {msgbody:"qweqweqweqweqweqweqweqweqewqwe", msgId:"6"},
        {msgbody:"qweqweqweqweqweqweqweqweqweqweqwe", msgId:"7"},
    ]

    return(
        <Expander type="multiple">
            {test_list.map(msg => (
                <ExpanderItem key={msg.msgId} title={msg.msgId} value={msg.msgId}>{msg.msgbody}</ExpanderItem>
            ))}
        </Expander>
    );
};

export default Processing;