import { mapValues, isFunction } from 'lodash';

function appendIndex(currentNode, index){
  if(!currentNode.index) return {...currentNode, index};
  if(!currentNode.nextIndex) return { ...currentNode, nextIndex : { index }};
  
  return {...currentNode, nextIndex : appendIndex(currentNode.nextIndex, index)};
}

function mapIndexToActionPayload(action, index){
  const payload = appendIndex({...action.payload}, index);

  return {...action, payload : payload};
}

function bindActionCreator(actionCreator, index){
  return (...args) => {
    const result = actionCreator(...args);

    if(isFunction(result)){
      return (dispatch, ...resultArgs) => {
        const newDispatch = action => dispatch(mapIndexToActionPayload(action, index));

        return result(newDispatch, ...resultArgs);
      };
    }

    return mapIndexToActionPayload(result, index);
  };
}

function bindActionCreatorMap(creators, index){
  return mapValues(creators, actionCreator => bindActionCreator(actionCreator, index));
}

export default function(actionCreators, index){
  return isFunction(actionCreators)
    ? bindActionCreator(actionCreators, index)
    : bindActionCreatorMap(actionCreators, index);
};