// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// function countReducer(prevState, newCount) {
//   // Format for reducerFunction:
//   // function reducer(previousState, <whatever params I need>)

//   // return the newState. Usually an object; in this case, simply a value.
//   return newCount
// }

// In THIS case, above can be simplified to:
const countReducer = (state, newState) => newState
// NOTICE: reducer function is OUTSIDE the Counter component. Stand alone function

function Counter({initialCount = 0, step = 1}) {
  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount)

  // Format for useReducer:
  // const [count, setCount] = React.useReducer(reducerFunction, initialState)

  ///* const [count, setCount] = React.useState(initialCount) */ // Test fails if (any line containint `useState`) does not BEGIN with `//`
  const [count, setCount] = React.useReducer(countReducer, initialCount)

  // 💰 you can write the countReducer function so you don't have to make any
  // changes to the next two lines of code! Remember:
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount
  const increment = () => setCount(count + step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

/* Instructions 01.js: useReducer replaces useState
		Replace useState hook with useReducer hook.
		You'll need to write a countReducer function to pass into the useReducer hook.
		It's first parameter must be state.
		You'll want its second parameter to be the new state value, so we can keep the
			same API that useState has.
			This will allow us to not have to change the any of the code that formerly
			used useState (our component invocations), once we replace it with useReducer
		Its return value should be the new state, ie the new value of the counter.
*/
/* SH Notes 01.js:
// reducer (state, optionalUserParam1, optionalUserParam2, ...)
//  Whatever funtion we pass in to our useReducer Hook,
//  Must always take state (the current, soon to be "prev" value)
//    as the first parameter.
//  (after that, we can add on any number of OUR params, including nothing else)
//  BUT, when we CALL our reducer via the function returned from useReducer,
//    we only call it with OUR Parameters.
//    React supplies the at-that-time current value of state.
//
//  As 01.md puts it:
//   One important thing to note here is that the reducer (eg nameReducer)
//     is called with two arguments:
//    - the current state
//    - whatever it is that the dispatch function (eg setName) is called with.
//      This is often called an “action.”
*/
