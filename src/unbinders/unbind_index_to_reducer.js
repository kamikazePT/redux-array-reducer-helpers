/**
 * Reducer decorator to fetch the payload index and nextIndex
 * @param {function} reducer - reducer to decorate
 * @param {string} key - key to fetch the index
 * @returns the mapped reducer that slices state with the current index, and applies to the inner reducer
 *          the next index on the action payload
 */
export default function(reducer, key){
  return (state, action) => {
    const indexes = {...action.payload.indexes};
    const index = indexes[key];
    indexes[key] = undefined;

    const newState = [...state];

    newState[index] = reducer(state[index], {...action, payload:
      {...action.payload, indexes : indexes}
    });

    return newState;
  };
};