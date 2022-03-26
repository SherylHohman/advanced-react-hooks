// useReducer: simple Counter
// 💯 accept the step as the action
// http://localhost:3000/isolated/exercise/01.extra-1.js

import * as React from 'react'

/* const countReducer = (state, newState) => newState */
const countReducer = (state, step) => state + step

function Counter({initialCount = 0, step = 1}) {
  const [count, setCount] = React.useReducer(countReducer, initialCount)

  /* const increment = () => setCount(count + step) */
  const increment = () => setCount(step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

// 01-extra-1
/* SH Notes 01.extra-1.js:
// API for useReducer's reducer function:
// function reducer(previousState, <whatever params I need>)
// function reducer(state, action)  // ie. action.type, action.payload
// 	return the newState.  // Usually an object; in this case, simply a value.
 */
/* Instructions 01.extra-1.js
		1. 💯 accept the step as the action

		This one is just to show that you can pass anything as the action.

		I want to change things a bit to have this API:

		const [count, changeCount] = React.useReducer(countReducer, initialCount)
		const increment = () => changeCount(step)
		How would you need to change your reducer to make this work?
*/
// 01
/* Instructions 01.js:
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
