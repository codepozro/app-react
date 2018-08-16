function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  require(Array.isArray(squares) && squares.length === 9, 'Array of 9 squares must be provided')

  const wonLine = lines.find((line) => {
    const players = squares.filter((v, i) => line.includes(i)) // does it keep the order?
    return players.every((player) => player !== null && player === players[0]) // check if all squares are taken by the same player
  })

  return (wonLine) ? squares[wonLine[0]] : undefined
}

function require (requiredCnd, message) {
  if (!requiredCnd) {
    throw Error(message)
  }
}

export default calculateWinner
