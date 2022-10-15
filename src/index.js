/* StrictMode is a tool for highlighting potential problems in an application. 
Like Fragment, StrictMode does not render any visible UI. 
It activates additional checks and warnings for its descendants. */
import { StrictMode } from 'react'
/* ReactDOM is the name of a JavaScript library. 
This library contains several React-specific methods,
one of which is ReactDOM.render(). */
import ReactDOM from 'react-dom'
/* Importing the css file. */
import './styles/index.css'
/* Importing the App component from the App.js file. */
import App from './components/App'
/* Importing the Provider component from the react-redux library. */
import { Provider } from 'react-redux'
/* Importing the store from the store.js file. */
import { store } from './store'

/* Getting the root element from the index.html file. */
const rootElement = document.getElementById('root')
ReactDOM.render(
  // the provider must include the whole application!
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>,
  rootElement
)
