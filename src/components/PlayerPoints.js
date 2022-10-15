/* Importing the useSelector hook from the react-redux library. */
import { useSelector } from 'react-redux'
/* Importing the selector function from the selectors.js file. */
import { selectPlayerPoints } from '../selectors'

/**
 * It displays the number of games won by a player
 * @returns A React component
 */
export function PlayerPoints({ playerId, playerName }) {
  const playerPoints = useSelector(selectPlayerPoints(playerId))

  return (
    <div className="player-games">
      <p>{playerName}</p>
      <p>
        {playerPoints === 0
          ? 'Aucun jeu gagné'
          : playerPoints === 1
          ? '1 jeu gagné'
          : `${playerPoints} jeux gagnés`}
      </p>
    </div>
  )
}
