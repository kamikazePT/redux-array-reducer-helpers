import bindIndexToActionCreators from '@/binders/bind_index_to_action_creators';

describe('thunk action creators', () => {
  it('It should inject index property in multiple dispatched actions', () => {
    const thunkActionCreator = () => {
      return (dispatch) => {
        dispatch({
          type : 'TEST_ACTION_ONE'
        });

        dispatch({
          type : 'TEST_ACTION_TWO'
        });
      }
    }

    const indexToInject = 2;

    const expectedActions = [
      {
        type : 'TEST_ACTION_ONE',
        index : indexToInject
      },
      {
        type : 'TEST_ACTION_TWO',
        index : indexToInject
      }
    ];

    let currentIdx = 0;
    const assertDispatch = (action) => expect(action).toEqual(expectedActions[currentIdx++]);

    const boundActionCreator = bindIndexToActionCreators(thunkActionCreator, indexToInject);

    boundActionCreator()(assertDispatch);
  });
});