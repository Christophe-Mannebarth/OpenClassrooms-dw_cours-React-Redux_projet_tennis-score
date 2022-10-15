// PLAYER'S POINTS BEFORE WIN
/**
 * calculate the number of points remaining to win:
 * - If the player has won, return null.
 * - If the player has an advantage, return 1.
 * - If the other player has an advantage, return 3.
 * - If the other player has 40 points,
 *   return the number of points needed to reach 40 plus 2.
 * - Otherwise, return the number of points needed to reach 40 plus 1.
 * @param playerId - The player who is currently serving.
 * @returns A function that takes a state and returns a number.
 */
export const selectPointBeforeWin = (playerId) => {
  const otherPlayerId = playerId === 'player1' ? 'player2' : 'player1'
  return (state) => {
    if (state.winner) {
      return null
    }
    if (state.advantage === playerId) {
      return 1
    }
    if (state.advantage === otherPlayerId) {
      return 3
    }
    const playerScore = state[playerId]
    const otherPlayerScore = state[otherPlayerId]
    const pointsTo40 =
      playerScore === 0
        ? 3
        : playerScore === 15
        ? 2
        : playerScore === 30
        ? 1
        : 0
    if (otherPlayerScore === 40) {
      return pointsTo40 + 2
    }
    return pointsTo40 + 1
  }
}

// PLAYER'S ADVANTAGE
/**
 * - This function returns a function that takes a state
 * and returns true if the state's advantage property
 * is equal to the playerId argument.
 * @param playerId - The player's id
 * @returns A function that takes a state and returns a boolean.
 */
export const selectPlayerHasAdvantage = (playerId) => {
  return (state) => state.advantage === playerId
}

// PLAYER'S SCORE
/**
 * - It takes a playerId and returns a function that takes a state
 * and returns the score of the player with the given playerId.
 * @param playerId - The playerId of the player you want to select the score for.
 * @returns A function that takes a state and returns the state[playerId]
 */
export const selectPlayerScore = (playerId) => {
  return (state) => state[playerId]
}

// DISPLAY TEXT STATE OF THE GAME AND SCORE
/**
 * - It returns a string that describes the current state of the game
 * @param state - the state of the store
 * @returns A function that takes a state and returns a string.
 */
export const selectDisplayText = (state) => {
  if (state.winner) {
    if (state.winner === 'player1') {
      let text = state.player1Name + ' gagne'
      return text
    } else {
      let text = state.player2Name + ' gagne'
      return text
    }
  } else if (state.playing === false) {
    return "C'est la pause"
  } else {
    let text = 'Le score est: ' + state.player1 + ' - ' + state.player2
    if (state.advantage) {
      if (state.advantage === 'player1') {
        text += ` avantage ${state.player1Name}`
      } else {
        text += ` avantage ${state.player2Name}`
      }
    }
    return text
  }
}

// PLAYER'S TOTAL POINTS
/**
 * - It takes a playerId and returns a function that takes a state
 * and returns the number of times that player has won
 * @param playerId - The ID of the player you want to get the points for.
 * @returns A function that takes a state and returns the number of times the player has won.
 */
export const selectPlayerPoints = (playerId) => {
  return (state) =>
    state.history.filter((item) => item.winner === playerId).length
}

// STATE OF THE GAME (playing or not)
/**
 * - This function takes in a state and returns a boolean value
 * that is true if the game is playing
 * and false if the game is not playing.
 * @param state - The state of the Redux store.
 */
export const selectGameIsPlaying = (state) => state.playing
