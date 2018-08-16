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

    renderSquare(i) {
        return (
            <Square sqid={ i }
                    takenBy={ this.state.squares[i] }
                    onClick={() => this.handleClick(i)}
            />
        );
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
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

//TODO: try Symbol for private method
function nextPlayer(isXNext) {
    return isXNext ? 'X' : 'O';
}

export default Board;