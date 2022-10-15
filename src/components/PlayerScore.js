/* Importing the useSelector hook from the react-redux library. */
import { useSelector } from 'react-redux'
/* Importing the selectPlayerHasAdvantage and selectPlayerScore functions from the selectors.js file. */
import {
  selectPlayerHasAdvantage,
  selectPlayerScore,
  selectPointBeforeWin,
} from '../selectors'

/**
 * We use the playerId to access the player's score in the Redux store,
 * and then we display it.
 * @param playerId   The ID of the player: either "Player1" or "Player2"
 * @param playerName The name of the player: either "Nadal" or "Federer"
 * @returns The player's score.
 */
export function PlayerScore({ playerId, playerName }) {
  // PlayerId is either "Player1" or "Player2"
  // We use it in the Selector to access:
  // the player's score, advantage and points before win.
  const score = useSelector(selectPlayerScore(playerId))
  const hasAdvantage = useSelector(selectPlayerHasAdvantage(playerId))
  const pointsBeforeWin = useSelector(selectPointBeforeWin(playerId))

  /* Returning the player's score. */
  return (
    <div className="player-score">
      <p>
        {playerName}
        {pointsBeforeWin === null
          ? ''
          : ` (encore ${pointsBeforeWin} ${
              pointsBeforeWin > 1 ? 'points' : 'point'
            })`}
      </p>
      <p>{(hasAdvantage ? 'Avantage ' : '') + score}</p>
    </div>
  )
}
