/**
 * Reducer decorator to fetch the payload index and nextIndex
 * @param {function} reducer - reducer to decorate
 * @returns the mapped reducer that slices state with the current index, and applies to the inner reducer
 *          the next index on the action payload
 */
export default function(reducer){
  return (state, action) => {
    const { index } = action.payload;
    const nextIndex = action.payload.nextIndex || { index : undefined, nextIndex : undefined };

    const newState = [...state];

    newState[index] = reducer(state[index], {...action, payload: {...action.payload, 
      index : nextIndex.index, nextIndex : nextIndex.nextIndex}
    });

    return newState;
  };
};