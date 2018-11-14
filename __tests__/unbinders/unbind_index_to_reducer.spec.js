import unbindIndexToReducer from '@/unbinders/unbind_index_to_reducer';

describe('unbindIndexToReducer', () => {
  it('It should parse single index on reducer', () => {
    const index = 0;
    const key = 'myIndexKey'

    const action = {
      type : 'TEST_ACTION',
      payload : {
        indexes : {
          [key] : index
        }
      }
    };

    const state = [1, 2];

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { 
        indexes : {
          [key] : undefined
        }
      }
    };

    const expectedState = state[index];

    const reducer = (receivedState, receivedAction) => {
      expect(receivedState).toEqual(expectedState);
      expect(receivedAction).toEqual(expectedAction);
    };

    unbindIndexToReducer(reducer, key)(state, action);
  });

  it('It should parse index on reducer whem multiple found', () => {
    const index = 0;
    const nextIndex = 1;
    const key = 'myIndexKey'
    const nextKey = 'myNextIndexKey'

    const action = {
      type : 'TEST_ACTION',
      payload : {
        indexes : {
          [key] : index,
          [nextKey] : nextIndex
        }
      }
    };

    const state = [1, 2];

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { 
        indexes : {
          [key] : undefined,
          [nextKey] : nextIndex
        }
      }
    };

    const expectedState = state[index];

    const reducer = (receivedState, receivedAction) => {
      expect(receivedState).toEqual(expectedState);
      expect(receivedAction).toEqual(expectedAction);
    };

    unbindIndexToReducer(reducer, key)(state, action);
  });
});