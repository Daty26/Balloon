import React from "react";
export default function Balloon(props) {
  return (
    <div className="balloonBox">
        { props.isVisible &&  (<div className="bCursor">
            <div 
            className={`balloons ${props.popped ? 'popped' : ''}`}
            style={{ backgroundColor: props.color }}
            onClick={props.onClick}
            >

            </div>
            <div className="line"></div>
        </div>)}
    </div>
  );
}