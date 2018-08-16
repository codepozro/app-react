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

    // what is a React/ES6 way to define 'private' methods to this class?
    nextPlayer() {
        return this.state.isXNext ? 'X' : 'O';
    }


    renderSquare(i) {
        return (
            <Square value={ (this.state.squares[i]) ? this.state.squares[i] : i }
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
        state.squares[i] = this.nextPlayer();
        state.isXNext = !this.state.isXNext;
        this.setState(state);

        /*
        // Alternatively, copy squares assuming that that all properties are known
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
        */
    }

    // when does render get called?
    render() {
        const maybeWinner = calculateWinner(this.state.squares);
        const status = maybeWinner ? 'Winner: ' + maybeWinner : 'Next player: ' + this.nextPlayer();

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

export default Board;