/* Importing the useSelector hook from the react-redux library. */
import { useSelector } from 'react-redux'
/* Importing the selector function from the selectors.js file. */
import { selectDisplayText } from '../selectors'

// DISPLAY
/**
 * - Displays the value of a Redux store variable
 * - Use "useSelector" with a function in parameter
 * @returns The displayText.
 */
export function Display() {
  const displayText = useSelector(selectDisplayText)

  return <p className="display">{displayText}</p>
}
