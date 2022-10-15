/* Importing the useDispatch hook from the react-redux library. */
import { useDispatch } from 'react-redux'
/* Importing the restartGame function from the store.js file. */
import { restartGame } from '../store'

// RESET BUTTON
/**
 * - It's a button that dispatches the restartGame action creator when clicked
 * @returns A button that dispatches the restartGame action creator.
 */
export function ResetButton() {
  const dispatch = useDispatch()

  // It's returning a button that dispatches the restartGame action creator when clicked.
  return (
    <button
      className="button"
      // It's dispatching the restartGame action creator when the button is clicked. */
      onClick={() => {
        dispatch(restartGame())
      }}
    >
      Remettre à zéro
    </button>
  )
}
