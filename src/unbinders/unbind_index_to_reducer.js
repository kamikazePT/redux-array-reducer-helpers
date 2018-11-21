import { isNumber, isNil, reduce } from 'lodash';

/**
 * Reducer decorator to fetch the payload index and nextIndex
 * @param {function} reducer - reducer to decorate
 * @param {string} key - key to fetch the index
 * @returns the mapped reducer that slices state with the current index, and applies to the inner reducer
 *          the next index on the action payload
 */
export default function(wrappedReducer, key){
  return (state, action) => {
    const indexes = {...action.payload.indexes};

    return isNil(key) ? 
      reduce(state, (result, value, namedKey) => {
        result[namedKey] = reducer(namedKey)[namedKey];
        return result;
      }, {}) : 
      reducer(key);

    function reducer(keyToReduce){
      const index = indexes[keyToReduce];
      indexes[keyToReduce] = undefined;
      const newState = isNumber(index) ? [...state] : {...state};
  
      newState[index] = wrappedReducer(state[index], {...action, payload:
        {...action.payload, indexes : indexes}
      });
  
      return newState;
    }
  };
};

