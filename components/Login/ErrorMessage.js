import React from 'react';
import {Text} from 'react-native';

function ErrorMessage({error, visible}) {
    if(!visible || !error){
        return <Text style={{color: 'red', padding: 5}}></Text>
    }
    return (
        <Text style={{color: 'red', padding: 5}}>{error}</Text>
    );
}

export default ErrorMessage;