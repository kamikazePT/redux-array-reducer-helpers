import unbindIndexToReducer from '@/unbinders/unbind_index_to_reducer';

describe('unbindIndexToReducer', () => {
  it('It should parse single index on reducer', () => {
    const index = 0;

    const action = {
      type : 'TEST_ACTION',
      payload : {
        index
      }
    };

    const state = [1, 2];

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { index : undefined }
    };

    const expectedState = state[index];

    const reducer = (receivedState, receivedAction) => {
      expect(receivedState).toEqual(expectedState);
      expect(receivedAction).toEqual(expectedAction);
    };

    unbindIndexToReducer(reducer)(state, action);
  });

  it('It should parse nested index on reducer', () => {
    const index = 0;
    const nextIndex = 1;

    const action = {
      type : 'TEST_ACTION',
      payload : {
        index : {
          value : index,
          nextIndex
        }
      }
    };

    const state = [1, 2];

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { index : 1 }
    };

    const expectedState = state[index];

    const reducer = (receivedState, receivedAction) => {
      expect(receivedState).toEqual(expectedState);
      expect(receivedAction).toEqual(expectedAction);
    };

    unbindIndexToReducer(reducer)(state, action);
  });
});