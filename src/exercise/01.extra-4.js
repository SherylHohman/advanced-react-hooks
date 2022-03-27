// useReducer: simple Counter
// 💯 traditional dispatch object with a type and switch statement
// http://localhost:3000/isolated/exercise/01.extra-4.js

import * as React from 'react'

const countReducer = (state, action) => {
  const {type, step} = action
  switch (type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + step,
      }
    default:
      throw Error(`unknown action.type ${action.type} in countReducer`)
  }
  // above version MODIFIES State (traditional dispatch-type reducer)
  // below version REPLACES State (not traditional reducer, unless that is the job for that action.type)
  // return {count: state.count + step}
}

function Counter({initialCount = 0, step = 1}) {
  /*
	const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
 */
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  const {count} = state

  // const incrementByValue = () =>
  //	setState({count: count + step})

  // const incrementByFunction = () =>
  //   setState(currentState => ({count: currentState.count + step}))

  // incrementByDispatch ;-)
  const increment = () => dispatch({type: 'INCREMENT', step})

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App

/* NOTE: about the reducer function (countReducer):
	// The instructions for none of the exercises clarify if we are to write it to
	//	use the traditional setState format (replace state),
	//	or the new hook setState format (only modify passed in values)
	//  (or did I state that backwards?)

	// in this app, they are exactly the same, because there is exactly one
	//	piece of state only.

	// So in the exercises I implement it one way, and add commented code for the
	//	other way.
	// Most exercises, I set state to be equal to the passed-in state value/function return.
	//	Because of the way the instructions are written combined with the progression
	//	the earliest exercises follow.
	// 	This shows where the course is weak both in the examples, progression, and
	//	instructions.
	//	If it wanted the code to be written so that the passed in newState should
	//	only modify *those* passed in state values, the instructions should say so.
	//	No matter what, they *should* disambiguate.
	//	Since they do not, I instead take my cue from the progression and starting
	//	point of the 1st 2 or so exercises. *They* (without explicitly stating
	//	otherwise) must then guide our interpretation.
	//	TODO: edit text in 01.md to clearly state that they want to only modify
	//			state values that are passed in, and to preserve any other previous
	//			properties/values.
	//	TODO: Even better would be to set up examples to naturally progress from
	//			setting equal to newState, to modifying only specified newState !
*/
/* NOTE 2: on progression of this section:
		In exercise 0, we calculate new state value outside the reducer
		In extra-1, we move calculation into the reducer
		In extra-2, we move calculation back outside the reducer
		In extra-3, it is still outside the reducer
		In extra-4, we move it back into the reducer
	This makes it seem psychotic. Not a good progression.
	 aslo not good for comparing methods.
	 I think this lesson set should have a smoother progression.
	 Also having more than 1 item in state might be a good idea.
	 And clarity between Replacing vs Modifying ought to be clearer.
	 TODO: ?? make some solid suggesion for course mod, or reword instructions?
	 				(probably not, but honestly, I think there is room for improvement,
						even if that means creating a different example to work through
					 )
 */

// ### 4. 💯 traditional dispatch object with a type and switch statement
/* SH Notes 01.extra-4.js:
 */
/* Instructions 01.extra-4.js | useReducer:
		### 4. 💯 traditional dispatch object with a type and switch statement

		[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/01.extra-4.js)

		Ok, now we can finally see what most people do conventionally (mostly thanks
		to redux). Update your reducer so I can do this:

		```javascript
		const [state, dispatch] = React.useReducer(countReducer, {
			count: initialCount,
		})
		const {count} = state
		const increment = () => dispatch({type: 'INCREMENT', step})
		```
*/
// ### 3. 💯 simulate setState with an object OR function
/* SH Notes 01.extra-3.js:
		I decided to show *2* counters.
		One that passes in the new state value directly, as in 01.extra-2
		One that passes in a function that, when invoked, calculates and
			returns the new state, based on the first param of the reducer
			function, which is supplied by React.
		Showing both counters shows that my reducer function indeed handles both
			use cases.
		It also makes it easy to compare how the 2 versions of the newState
			function (the onClick handler) would be written.
 */
/* Instructions 01.extra-3.js | useReducer:

		### 3. 💯 simulate setState with an object OR function

		[Production deploy](https://advanced-react-hooks.netlify.com/isolated/final/01.extra-3.js)

		`this.setState` from class components can also accept a function.
		So let's add support for that with our simulated `setState` function.
		See if you can figure out how to make your reducer support both the object
		as in the last extra credit as well as a function callback:

		```javascript
		const [state, setState] = React.useReducer(countReducer, {
			count: initialCount,
		})
		const {count} = state
		const increment = () =>
			setState(currentState => ({count: currentState.count + step}))
		```
*/
// ### 2. 💯 simulate setState with an object
/* SH Notes 01.extra-2.js:
		changes API again. Now back to passing in the new state, like we did in 01.js.
		except this time state is an object. (extra-1 had us calculate state within
		the reducer; we instead passed in the data required to calculate the new state)
		That evidentally was a temp diversion.

		A different interpretation of the new API is that we are passing in only the
		properties on state that we want changed. Since there is only 1 property, it
		is inclear if the exercise is guiding us toward passing the new state as a
		whole, or the new values for properties that we want updated on the state
		object.

		So I have both versions (one commented out) in my code.

		It would be awesome if the instructions hinted at the goal we are reaching
		for, and hence would better guide how we should tailor our reducer function.
		(It matters for param naming, and for the format we settle on for how we
		compute the returned state object, so the proper use case is accounted for,
		without unnecessary code complexity. -- though I TEND togo for the more
		complex version to cover more cases, I see that Dodds & other pros TEND to
		prefer minimal, but complete for the use case. I tend toward risk adverse
		that could prevent future errors in the case of refactoring beyond the init
		usage.
		For example: in Hooks module, I PREFER .then.catch. He prefers (success, failure))
		Of course I worry that some later re-write might add code besides a setState
		call, that introduce an error. If that were to happen, the error might not
		be caught appropriately. But I guess, it is dumb to think the fetch function
		would ever be re-written to include any code other than setState. And they
		have the foresight to KNOW that. BTW, I updated my code to follow THEIR lead.
		But, I prefer to have the safer default to be my HABIT. Otherwise, I forget
		when those edge cases might arise, and can produce a difficult to find bug.
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
// ### 1. 💯 accept the step as the action
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
// ### 0. useReducer powers useState under the hood
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
