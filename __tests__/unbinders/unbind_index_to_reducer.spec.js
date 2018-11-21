import unbindIndexToReducer from '@/unbinders/unbind_index_to_reducer';

describe('unbindIndexToReducer', () => {
  it('It should parse single index on reducer', () => {
    const index = 0;
    const key = 'myIndexKey';

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

      return receivedState;
    };

    const newState = unbindIndexToReducer(reducer, key)(state, action);

    expect(state).toEqual(newState);
  });

  it('It should parse named index on reducer', () => {
    const key = 'myIndexKey';
    const otherKey = 'myOtherIndexKey';

    const action = {
      type : 'TEST_ACTION',
      payload : {
        indexes : {
          [key] : key
        }
      }
    };

    const state = {
      [key] : 1,
      [otherKey] : 2
    };

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { 
        indexes : {
          [key] : undefined
        }
      }
    };

    const expectedState = state[key];

    const reducer = (receivedState, receivedAction) => {
      expect(receivedState).toEqual(expectedState);
      expect(receivedAction).toEqual(expectedAction);

      return receivedState;
    };

    const newState = unbindIndexToReducer(reducer, key)(state, action);

    expect(state).toEqual(newState);
  });

  it('It should parse all named index on reducer if none specified', () => {
    const key = 'myIndexKey';
    const otherKey = 'myOtherIndexKey';

    const action = {
      type : 'TEST_ACTION',
      payload : {
        indexes : {
          [key] : key,
          [otherKey] : otherKey
        }
      }
    };

    const state = {
      [key] : 1,
      [otherKey] : 2
    };

    const expectedAction = [
      {
        type : 'TEST_ACTION',
        payload : { 
          indexes : {
            [key] : undefined,
            [otherKey] : otherKey
          }
        }
      },
      {
        type : 'TEST_ACTION',
        payload : { 
          indexes : {
            [key] : undefined,
            [otherKey] : undefined
          }
        }
      }
    ];

    const expectedState = [
      state[key],
      state[otherKey]
    ];

    let curr = 0;
    const reducer = (receivedState, receivedAction) => {
      expect(receivedState).toEqual(expectedState[curr]);
      expect(receivedAction).toEqual(expectedAction[curr]);
      curr++;

      return receivedState;
    };

    const newState = unbindIndexToReducer(reducer)(state, action);

    expect(state).toEqual(newState);
  });

  it('It should parse index on reducer when multiple found', () => {
    const index = 0;
    const nextIndex = 1;
    const key = 'myIndexKey';
    const nextKey = 'myNextIndexKey';

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

      return receivedState;
    };

    const newState = unbindIndexToReducer(reducer, key)(state, action);

    expect(state).toEqual(newState);
  });
});