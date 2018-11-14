import bindIndexToActionCreators from '@/binders/bind_index_to_action_creators';

describe('bindIndexToActionCreators', () => {
  it('It should inject index property on simple action creator', () => {
    const actionCreator = () => ({
      type : 'TEST_ACTION'
    });

    const index = 2;
    const key = 'myIndexKey';

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { 
        indexes : {
          [key] : index
        }
      }
    };

    const boundActionCreator = bindIndexToActionCreators(actionCreator, {
      [key] : index
    });

    expect(boundActionCreator()).toEqual(expectedAction);
  });

  it('It should inject multiple index property on simple action creator', () => {
    const actionCreator = () => ({
      type : 'TEST_ACTION'
    });

    const index = 2;
    const key = 'myIndexKey';
    const nextIndex = 1;
    const nextKey = 'myNextIndexKey';

    const expectedAction = {
      type : 'TEST_ACTION',
      payload : { 
        indexes : {
          [key] : index,
          [nextKey] : nextIndex
        }
      }
    };

    const boundActionCreator = bindIndexToActionCreators(actionCreator, {
      [key] : index,
      [nextKey] : nextIndex
    });

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
    const key = 'myIndexKey';

    const expectedActions = [
      {
        type : 'TEST_ACTION_ONE',
        payload : { 
          indexes : {
            [key] : index
          } 
        }
      },
      {
        type : 'TEST_ACTION_TWO',
        payload : { 
          indexes : {
            [key] : index
          } 
        }
      }
    ];

    let currentIdx = 0;
    const assertDispatch = (action) => expect(action).toEqual(expectedActions[currentIdx++]);

    const boundActionCreator = bindIndexToActionCreators(thunkActionCreator, {
      [key] : index
    });

    boundActionCreator()(assertDispatch);
  });
});