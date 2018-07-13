import { isPlainObject } from 'lodash';

export default function(reducer){
  return (state, action) => {
    const { index } = action.payload;
    const isNested = isPlainObject(index);
    const curIndex = isNested ? index.value : index;
    const nextIndex = isNested ? index.nextIndex : undefined;

    return reducer(state[curIndex], {...action, payload: {...action.payload, index: nextIndex}});
  };
};