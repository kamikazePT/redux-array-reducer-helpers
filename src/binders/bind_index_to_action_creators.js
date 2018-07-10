import { mapValues } from 'lodash';

function mapIndexToActionPayload(action, index){
  return {...action, payload : {...action.payload, index}};
}

function bindActionCreator(actionCreator, index){
  return (...args) => {
    const result = actionCreator(...args);

    if(typeof result === 'function'){
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
  return typeof actionCreators === 'function'
    ? bindActionCreator(actionCreators, index)
    : bindActionCreatorMap(actionCreators, index);
};