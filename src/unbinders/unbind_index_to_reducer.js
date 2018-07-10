import { isArray } from 'lodash';

function getIndex({ payload }){
  const { index } = payload;
  return isArray(index) ? index : [ index ];
}

export default function(reducer){
  return (state, action) => {
    const [index, ...nextIndexes] = getIndex(action);
    return reducer(state[index], {...action, payload: {...action.payload, index: nextIndexes}});
  };
};