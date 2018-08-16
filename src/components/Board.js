import React from "react";
import Square from './Square';
import calculateWinner from '../winnerCalculator';

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            isXNext: true
        }
    }

    handleClick(i) {
        // if there is a winner or the square has already been taken
        if (calculateWinner(this.state.squares) || this.state.squares[i]) {
            return;
        }

        const state = JSON.parse(JSON.stringify(this.state)); // deep copy
        state.squares[i] = nextPlayer(this.state.isXNext);
        state.isXNext = !this.state.isXNext;
        this.setState(state);
    }

    // when does render get called?
    render() {
        const maybeWinner = calculateWinner(this.state.squares);
        const status = maybeWinner ? 'Winner: ' + maybeWinner : 'Next player: ' + nextPlayer(this.state.isXNext);

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {renderSquares(this, [0,1,2])}
                </div>
                <div className="board-row">
                    {renderSquares(this, [3,4,5])}
                </div>
                <div className="board-row">
                    {renderSquares(this, [6,7,8])}
                </div>
            </div>
        );
    }
}

function renderSquare(board, index) {
    return (
        <Square sqid={ index }
                takenBy={ board.state.squares[index] }
                onClick={() => board.handleClick(index)}
        />
    );
}

function renderSquares(board, indexes) {
    return indexes.map((index) => renderSquare(board, index));
}

//TODO: try Symbol for private method
function nextPlayer(isXNext) {
    return isXNext ? 'X' : 'O';
}

export default Board;