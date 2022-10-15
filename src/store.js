/* Importing the createStore function from the redux library. */
import { createStore } from 'redux'
/* It's a library that allows us to write immutable code in a more readable way. */
import produce from 'immer'

// STATE
/* It's the initial state of the application. */
const initialState = {
  // The score of each players
  player1: 0,
  player2: 0,
  // Name of each players
  player1Name: 'Nadal',
  player2Name: 'Federer',
  // if there are 40-40 which player has the advantage
  // we use null if no advantage
  advantage: null,
  // Who won ?
  // If the part is in progress we use null
  winner: null,
  // Is the game in progress?
  // The game is in break at initialization
  playing: false,
  // History of the games played
  history: [
    // { player1: 15, player2: 40, winner: "player2" }
  ],
}

// ACTIONS CREATORS

// pause / resume the game
/**
 * Returns an object with a type property and a payload property
 * @param playing - boolean
 */
export const setPlaying = (playing) => ({
  type: 'setPlaying',
  payload: playing,
})

// restart the game
/**
 * - Returns an object with a type property set to 'restart'
 */
export const restartGame = () => ({ type: 'restart' })

// point scored
/**
 * - Returns an object with a "type" property and a "payload" property."
 * The "type" property is a string that describes the action.
 * The "payload" property is an object that
 * contains any data needed for the action
 * @param player - The player who scored the point.
 */
// A player scored a point
// we pass in parameter the player who marked
export const pointScored = (player) => ({
  type: 'pointScored',
  payload: { player: player },
})

// autoplay
/**
 * - It waits 2 seconds, then it randomly scores a point for either player
 * @param store - the Redux store
 * @returns A function that takes a store as an argument.
 */
export function autoplay(store) {
  // It's getting the playing property from the state object.
  const isPlaying = store.getState().playing
  // It's checking if the game is playing or if there is a winner.
  if (isPlaying || store.getState().winner) {
    return
  }
  // We indicate that the part is underway
  store.dispatch(setPlaying(true))
  /* It's calling the playNextPoint function. */
  playNextPoint()

  /**
   * It plays a point, waits a random amount of time,
   * then plays another point, and so on until a player wins
   * @returns The function playNextPoint().
   */
  function playNextPoint() {
    // It's checking if the game is paused.
    if (store.getState().playing === false) {
      return
    }
    // It's generating a random number between 1000 and 3000.
    const time = 1000 + Math.floor(Math.random() * 2000)
    // It's waiting a random amount of time,
    // then it randomly scores a point for either player.
    window.setTimeout(() => {
      /* It's checking if the game is paused. */
      if (store.getState().playing === false) {
        return
      }
      // If not we mark a random point
      const pointWinner = Math.random() > 0.5 ? 'player1' : 'player2'
      // It's dispatching an action to the store.
      store.dispatch(pointScored(pointWinner))
      // It's checking if there is a winner.
      if (store.getState().winner) {
        // It's dispatching an action to the store.
        store.dispatch(setPlaying(false))
        return
      }
      // It's calling the playNextPoint function. */
      playNextPoint()
    }, time)
  }
}
// REDUCER
/**
 * "If the game is not over, and the game is playing,
 * and the player has not scored 40 points,
 * then add 15 points to the player's score."
 *
 * - It is a function that contains logic
 * and who receives the state and an action.
 * @param state - the current state of the application
 * @param action - the action object that was dispatched
 * @returns The state of the game
 */
function reducer(state = initialState, action) {
  // It's checking if the action type is "restart".
  if (action.type === 'restart') {
    return produce(state, (draft) => {
      // If the match is finished, we add an element to the history
      if (draft.winner) {
        draft.history.push({
          player1: draft.player1,
          player2: draft.player2,
          winner: draft.winner,
        })
      }
      // then we reset the other properties
      draft.player1 = 0
      draft.player2 = 0
      draft.advantage = null
      draft.winner = null
      draft.playing = false
    })
  }
  // It's checking if the action type is "setPlaying".
  if (action.type === 'setPlaying') {
    // Method without immer:
    /*return {
      ...state,
      playing: action.payload,
    }*/
    // with immer: It's returning a new object that is a copy of the state object,
    // but with the playing property set to the opposite of its current value.
    return produce(state, (draft) => {
      draft.playing = action.payload
    })
  }
  // It's checking if the action type is "pointScored".
  if (action.type === 'pointScored') {
    // It's getting the player who scored the point from the action object.
    const player = action.payload.player
    // It's getting the other player.
    const otherPlayer = player === 'player1' ? 'player2' : 'player1'
    // It's checking if the game is over.
    if (state.winner) {
      // We cannot score points if the set is finished
      return state
    }
    // It's checking if the game is paused.
    if (state.playing === false) {
      // We cannot score points if the set is on a break
      return state
    }
    return produce(state, (draft) => {
      // It's getting the score of the player who scored the point.
      const currentPlayerScore = draft[player]
      // It's checking if the player has scored 0 or 15 points.
      if (currentPlayerScore <= 15) {
        // method without immer:
        /* return { ...state, [player]: currentPlayerScore + 15 } */
        // 0 or 15 => we add 15
        draft[player] += 15
        return
      }
      // It's checking if the player has scored 30 points.
      if (currentPlayerScore === 30) {
        // Method without immer:
        /*return { ...state, [player]: 40 } */
        draft[player] = 40
        return
      }
      // It's checking if the player has scored 40 points.
      if (currentPlayerScore === 40) {
        // It's checking if the other player has scored 40 points.
        if (draft[otherPlayer] !== 40) {
          // method without immer:
          /* return { ...state, winner: player } */
          // The player won
          draft.winner = player
          return
        }
        // It's checking if the player who scored the point has the advantage.
        if (draft.advantage === player) {
          // method without immer:
          /* return { ...state, winner: player } */
          // The player won
          draft.winner = player
          return
        }
        // It's checking if the player who scored the point has the advantage.
        if (draft.advantage === null) {
          // Method without immer:
          /* return { ...state, advantage: player } */
          // The player now has the advantage
          draft.advantage = player
          return
        }
        // method without immer:
        /* return { ...state, advantage: null } */
        // The other player has lost the advantage
        draft.advantage = null
        return
      }
    })
  }
  // It's the default return value of the reducer function.
  // if the action type is not recognized.
  return state
}

// STORE
// It creates a store that will hold the state of the application.
export const store = createStore(reducer)

/* It's a function that is called every time the state of the application changes. */
/*store.subscribe(() => {
  console.log('Nouveau state:')
  console.log(store.getState())
})*/
