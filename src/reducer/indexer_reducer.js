import { createReducer } from 'redux-create-reducer';
import unbindIndexToReducer from '../unbinders/unbind_index_to_reducer';
import { mapValues } from 'lodash';

/**
 * Will create a reducer to handle the given action types, splitting state by indexes for the wrappedReducer to handle
 * @param {function} wrappedReducer - reducer to decorate
 * @param {object} action types - key to fetch the index
 * @param {object} [options]
 * @param {object} [options.initialState] initial state for the reducer
 * @param {string} [options.key] - key to fetch the index
 * @returns the mapped reducer that handles the types for sliced index state
 */
export default function reducer(wrappedReducer, actionTypes, { initialState = { }, key } = {}){
  const itemReducer = unbindIndexToReducer(wrappedReducer, key);
  return createReducer(initialState, mapValues(actionTypes, () => itemReducer));
}