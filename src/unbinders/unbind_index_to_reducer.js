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