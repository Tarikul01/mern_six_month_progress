import React from 'react'

const TextMinimize = (value) => {
    if(value.length<100){
        return value
    }else{
        return value.substring(0,100)+".....";
    }
 
}

export default TextMinimize
