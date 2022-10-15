/* Importing the useDispatch hook from the react-redux library. */
import { useSelector, useStore } from 'react-redux'
/* Importing the `autoplay` function from the `./store` file. */
import { autoplay } from '../store'
/* Importing the `selectGameIsPlaying` function from the `./selectors` file. */
import { selectGameIsPlaying } from '../selectors'

/**
 * - It's a button that, when clicked, dispatches an action to the store
 *   that toggles the game's playing state.
 * @returns A React component.
 */
export function PlayPauseButton() {
  const store = useStore()
  const playing = useSelector(selectGameIsPlaying)

  return (
    <button
      className="button"
      onClick={() => {
        autoplay(store)
      }}
    >
      {playing ? 'jeu en cours...' : 'Jouer'}
    </button>
  )
}
