import React from 'react';
import {Text} from 'react-native';

function ErrorMessage({error, visible, size}) {
    if(!visible || !error){
        return <Text style={{ color: "red", padding: 2 }}></Text>;
    }
    return (
        <Text style={{color: 'red', padding: 5, fontSize: size}}>{error}</Text>
    );
}

export default ErrorMessage;