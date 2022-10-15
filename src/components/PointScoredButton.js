/* Importing the useDispatch hook from react-redux. */
import { useDispatch } from 'react-redux'
/* Importing the action creator function from the store. */
import { pointScored } from '../store'

// POINT SCORED BUTTON
/**
 * - It's a button that dispatches a Redux action when clicked.
 * @returns A button that when clicked will dispatch the pointScored action creator.
 */
export function PointScoredButton({ playerId, children }) {
  const dispatch = useDispatch()

  // It's returning a button that when clicked will dispatch the pointScored action creator. */
  return (
    <button
      className="button"
      // It's dispatching the pointScored action creator when the button is clicked.
      onClick={() => {
        dispatch(pointScored(playerId))
      }}
    >
      {children}
    </button>
  )
}
