/* Importing the Display component from the Display.js file. */
import { Display } from './Display'
/* Importing the PlayPauseButton component from the PlayPauseButton.js file. */
import { PlayPauseButton } from './PlayPauseButton'
/* Importing the ResetButton component from the ResetButton.js file. */
import { ResetButton } from './ResetButton'
/* Importing the PointScoredButton component from the PointScoredButton.js file. */
import { PointScoredButton } from './PointScoredButton'
/* Importing the PlayerScore component from the PlayerScore.js file. */
import { PlayerScore } from './PlayerScore'
/* Importing the useSelector hook from the react-redux library. */
import { useSelector } from 'react-redux'
/* Importing the PlayerPoints component from the PlayerPoints.js file. */
import { PlayerPoints } from './PlayerPoints'

// APP
/**
 * It returns a div containing:
 * - a Display component,
 * - two PlayerScore components,
 * - two PointScoredButton components,
 * - and two ResetButton and PlayPauseButton components
 * @returns A React component
 */
export default function App() {
  // Returns the values of the properties of the state that you want to recover.
  const player1Name = useSelector((state) => state.player1Name)
  const player2Name = useSelector((state) => state.player2Name)

  return (
    <div>
      <PlayerPoints playerId="player1" playerName={player1Name} />
      <PlayerPoints playerId="player2" playerName={player2Name} />
      <Display />
      <PlayerScore playerId="player1" playerName={player1Name} />
      <PlayerScore playerId="player2" playerName={player2Name} />
      <div className="buttons-row">
        <PointScoredButton playerId="player1">
          Point {player1Name}
        </PointScoredButton>
        <PointScoredButton playerId="player2">
          Point {player2Name}
        </PointScoredButton>
      </div>
      <div className="buttons-row">
        <ResetButton />
        <PlayPauseButton />
      </div>
    </div>
  )
}
