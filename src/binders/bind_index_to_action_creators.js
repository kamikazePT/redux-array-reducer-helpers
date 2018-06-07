import { mapValues } from 'lodash';

const bindActionCreator = (actionCreator, index) => 
  (...args) => {
    const result = actionCreator(...args);

    if(typeof result === 'function'){
      return (dispatch, ...resultArgs) => {
        const newDispatch = action => dispatch({...action, index});

        return result(newDispatch, ...resultArgs);
      };
    }

    return {...result, index };
  };

const bindActionCreatorMap = (creators, index) =>
  mapValues(creators, actionCreator => bindActionCreator(actionCreator, index));

const bindIndexToActionCreators = (actionCreators, index) => {
  return typeof actionCreators === 'function'
    ? bindActionCreator(actionCreators, index)
    : bindActionCreatorMap(actionCreators, index);
};

export default bindIndexToActionCreators;