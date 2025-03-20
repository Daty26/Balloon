import React from "react";

export default function Header(props){
    return(
        <div className="navCont">
            <div className="logo">Pop-a-balloon</div>
            <div className="score">
                <span>{props.score}</span><p> hits</p>
                {
                 props.isRunning  ? (
                    <button className="startStop" onClick={props.onStop}>Stop</button>
                ) : (
                    <button className="startStop" onClick={props.onStart}>Start</button>
                )}
            </div>
        </div>
    )
}