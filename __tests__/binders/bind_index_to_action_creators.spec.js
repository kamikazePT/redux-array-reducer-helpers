import bindIndexToActionCreators from '@/binders/bind_index_to_action_creators';

describe('bindIndexToActionCreators', () => {
  it('It should inject index property on simple action creator', () => {
    const actionCreator = () => ({
      type : 'TEST_ACTION'
    });

    const index = 2;

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { index }
    };

    const boundActionCreator = bindIndexToActionCreators(actionCreator, index);

    expect(boundActionCreator()).toEqual(expectedAction);
  });

  it('It should inject nested index property on simple action creator', () => {
    const actionCreator = () => ({
      type : 'TEST_ACTION'
    });

    const index = 2;
    const nextIndex = 1;

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { 
        index : {
          value : index,
          nextIndex
        }
      }
    };

    const boundActionCreator = bindIndexToActionCreators(bindIndexToActionCreators(actionCreator, index), nextIndex);

    expect(boundActionCreator()).toEqual(expectedAction);
  });

  it('It should inject index property in multiple dispatched actions from thunk action creator', () => {
    const thunkActionCreator = () => {
      return (dispatch) => {
        dispatch({
          type : 'TEST_ACTION_ONE'
        });

        dispatch({
          type : 'TEST_ACTION_TWO'
        });
      };
    };

    const index = 2;

    const expectedActions = [
      {
        type : 'TEST_ACTION_ONE',
        payload : { index }
      },
      {
        type : 'TEST_ACTION_TWO',
        payload : { index }
      }
    ];

    let currentIdx = 0;
    const assertDispatch = (action) => expect(action).toEqual(expectedActions[currentIdx++]);

    const boundActionCreator = bindIndexToActionCreators(thunkActionCreator, index);

    boundActionCreator()(assertDispatch);
  });

  it('It should inject nested index property in multiple dispatched actions from thunk action creator', () => {
    const thunkActionCreator = () => {
      return (dispatch) => {
        dispatch({
          type : 'TEST_ACTION_ONE'
        });

        dispatch({
          type : 'TEST_ACTION_TWO'
        });
      };
    };

    const index = 2;
    const nextIndex = 1;
    const expectedIndexProperty = {
      index : {
        value : index,
        nextIndex
      }
    };

    const expectedActions = [
      {
        type : 'TEST_ACTION_ONE',
        payload : expectedIndexProperty
      },
      {
        type : 'TEST_ACTION_TWO',
        payload : expectedIndexProperty
      }
    ];

    let currentIdx = 0;
    const assertDispatch = (action) => expect(action).toEqual(expectedActions[currentIdx++]);

    const boundActionCreator = bindIndexToActionCreators(bindIndexToActionCreators(thunkActionCreator, index), nextIndex);

    boundActionCreator()(assertDispatch);
  });
});