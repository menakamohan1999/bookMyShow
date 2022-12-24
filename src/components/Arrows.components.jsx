import React from "react";

export const NextArrow = (props)=>{
    //from props we get className,onClick,Styles
    return (
    <>
    <div className={props.className} 
    style={{...props.style,backgroundColor:"black"}} 
    onClick={props.onClick}/>
    </>
    );
};

export const PrevArrow = (props)=>{
    return (
    <>
     <div  className={props.className} 
    style={{...props.style,backgroundColor:"black"}} 
    onClick={props.onClick}/>
    </>
    );
};