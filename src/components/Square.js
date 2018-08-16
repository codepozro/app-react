import React from "react";

// functional component
function Square(props) {
    // referring to props directly rather than creating a state
    // @see https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html
    return (
        <button className="square" onClick={props.onClick}>
            { props.takenBy ? props.takenBy : props.sqid }
        </button>
    );
}

export default Square;