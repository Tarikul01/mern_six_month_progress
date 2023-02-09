import React, { Component, Fragment ,useEffect,useState} from "react";
import AppNavbar from "../Components/Common/AppNavbar";
import MainBody from "../Components/MainBody";
const CreatePage = () => {
  const [id,setId]=useState(false);
  useEffect(()=>{
    console.log(id)

  },[id])
  return (
    <>
    <AppNavbar setId={setId}/>
      <MainBody id={id}/>
    </>
  );
};

export default CreatePage;
