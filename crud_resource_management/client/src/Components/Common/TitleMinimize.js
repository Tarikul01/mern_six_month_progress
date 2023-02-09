import React from 'react'

const TitleMinimize = (value) => {
    if(value.length<20){
        return value
    }else{
        return value.substring(0,20)+".....";
    }
 
}

export default TitleMinimize
