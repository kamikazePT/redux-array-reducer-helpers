### Installation

using npm

```sh
$ npm i redux-array-reducer-helpers
```

using yarn

```sh
$ yarn add redux-array-reducer-helpers
```

### Motivation

You start with a button and an action to toggle its state.
When you change to a list of buttons, the action needs to be modified to use an identifier of the button itself that was clicked (usually and index).

The idea here is to have the action unchanged and wrap it into another action creator that injects the index

It also supports multiple dispatches (for example in a thunk action used with redux-thunk)

### Example

action creator
```
export function doToggleColor() {
  return {
    type: actionTypes.DO_TOGGLE_COLOR
  };
}
```

injection
```
import { bindIndexToActionCreators } from 'redux-array-reducer-helpers'
import { doToggleColor } from 'actions/button_actions'

... etc
bindIndexToActionCreators(doToggleColor, index)
... etc

```

License
----

MIT