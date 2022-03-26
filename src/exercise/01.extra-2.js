// useReducer: simple Counter
// 💯 simulate setState with an object
// http://localhost:3000/isolated/exercise/01.extra-2.js

import * as React from 'react'

// const countReducer = (state, step) => state + step
const countReducer = (state, step) => ({count: state.count + step})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const increment = () => setState(step)
  return <button onClick={increment}>{state.count}</button>
}

function App() {
  return <Counter />
}

export default App

/* SH Notes 01.extra-2.js:
 */
/* Instructions 01.extra-2.js | useReducer:
		### 2. 💯 simulate setState with an object

		[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/01.extra-2.js)

		Remember `this.setState` from class components? If not, lucky you 😉.
		Either way, let's see if you can figure out how to make the state updater
		(`dispatch` function) behave in a similar way by changing our `state` to an
		object (`{count: 0}`)
		and then calling the state updater with an object
		merges with the current state.

		So here's how I want things to look now:

			```javascript
			const [state, setState] = React.useReducer(countReducer, {
				count: initialCount,
			})
			const {count} = state
			const increment = () => setState({count: count + step})
			```

		How would you need to change the reducer to make this work?
*/
// 01-extra-1
/* SH Notes 01.extra-1.js:
// API for useReducer's reducer function:
// function reducer(previousState, <whatever params I need>)
// function reducer(state, action)  // ie. action.type, action.payload
// 	return the newState.  // Usually an object; in this case, simply a value.
 */
/* Instructions 01.extra-1.js | useReducer: use step as the action arg
		1. 💯 accept the step as the action

		This one is just to show that you can pass anything as the action.

		I want to change things a bit to have this API:

		const [count, changeCount] = React.useReducer(countReducer, initialCount)
		const increment = () => changeCount(step)
		How would you need to change your reducer to make this work?
*/
// 01
/* Instructions 01.js | useReducer: vs useState
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
