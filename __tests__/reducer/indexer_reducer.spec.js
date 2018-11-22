import indexedReducer from '@/reducer/indexer_reducer';

const actionTypes = {
  ONE : 'ONE',
  TWO : 'TWO',
  THREE : 'THREE'
};

const actions = {
  ONE : { type : actionTypes.ONE, payload: { indexes : { [actionTypes.ONE] : actionTypes.ONE } } } ,
  TWO : { type : actionTypes.TWO, payload: { indexes : { [actionTypes.TWO] : actionTypes.TWO } } } ,
  THREE : { type : actionTypes.THREE, payload: { indexes : { [actionTypes.THREE] : actionTypes.THREE } } }
};

const reducer = () => {
  return true;
};

describe('indexedReducer', () => {
  it('It should handle action type', () => {
    const expectedState = {
      ONE : true
    };

    const wrapperReducer = indexedReducer(reducer, actionTypes);
    const resultState = wrapperReducer({}, actions.ONE);

    expect(resultState).toEqual(expectedState);
  });
});