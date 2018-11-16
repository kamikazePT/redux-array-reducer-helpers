import { mapValues, isFunction, isString } from 'lodash';

function mapIndexToActionPayload(action, keyIndexMap){
  return {...action, payload : {...action.payload, indexes : keyIndexMap}};
}

function bindActionCreator(actionCreator, keyIndexMap){
  return (...args) => {
    const result = actionCreator(...args);

    if(isFunction(result)){
      return (dispatch, ...resultArgs) => {
        const newDispatch = action => dispatch(mapIndexToActionPayload(action, keyIndexMap));

        return result(newDispatch, ...resultArgs);
      };
    }

    return mapIndexToActionPayload(result, keyIndexMap);
  };
}

function bindActionCreatorMap(creators, keyIndexMap){
  return mapValues(creators, actionCreator => bindActionCreator(actionCreator, keyIndexMap));
}

/**
 * Factory of index-based action creators
 * @param {object|function} actionCreators - redux action creator(s)
 * @param {string|object} keyIndexMap - string or key value pair dictionary with key : index to bind in each action generated by each action creator
 * @returns the mapped action creators with the index bound to the generated actions
 */
export default function(actionCreators, keyOrKeyIndexMap){
  const keyIndexMap = isString(keyOrKeyIndexMap) ? { [keyOrKeyIndexMap] : keyOrKeyIndexMap } : keyOrKeyIndexMap;

  return isFunction(actionCreators)
    ? bindActionCreator(actionCreators, keyIndexMap)
    : bindActionCreatorMap(actionCreators, keyIndexMap);
};