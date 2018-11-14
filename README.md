[![npm version](https://badge.fury.io/js/redux-reducer-array-helpers.svg)](https://badge.fury.io/js/redux-reducer-array-helpers)
[![Build Status](https://travis-ci.org/kamikazePT/redux-reducer-array-helpers.svg?branch=master)](https://travis-ci.org/kamikazePT/redux-reducer-array-helpers)
[![Coverage Status](https://coveralls.io/repos/github/kamikazePT/redux-reducer-array-helpers/badge.svg?branch=master)](https://coveralls.io/github/kamikazePT/redux-reducer-array-helpers?branch=master)
[![Inline docs](http://inch-ci.org/github/kamikazePT/redux-reducer-array-helpers.svg?branch=master)](http://inch-ci.org/github/kamikazePT/redux-reducer-array-helpers)
[![HitCount](http://hits.dwyl.io/kamikazePT/redux-reducer-array-helpers.svg)](http://hits.dwyl.io/kamikazePT/redux-reducer-array-helpers)
[![Dependencies](https://david-dm.org/kamikazePT/redux-reducer-array-helpers.svg)]
(http://hits.dwyl.io/kamikazePT/redux-reducer-array-helpers)
[![Dev Dependencies](https://david-dm.org/kamikazePT/redux-reducer-array-helpers/dev-status.svg)]
(http://hits.dwyl.io/kamikazePT/redux-reducer-array-helpers?type=dev)

[![NPM](https://nodei.co/npm/redux-reducer-array-helpers.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redux-reducer-array-helpers/)

[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/kamikazePT/redux-reducer-array-helpers/issues)

### Installation

install 

```sh
$ npm i redux-array-reducer-helpers 
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

color list reducer handler
```
import { unbindIndexToReducer } from 'redux-array-reducer-helpers'

  function doToggleColorHandler(state, action) {
    const newColors = unbindIndexToReducer(colorItemReducer)(state.colors, action);

    return { ...state, colors: newColors };
  }

```

License
----

MIT