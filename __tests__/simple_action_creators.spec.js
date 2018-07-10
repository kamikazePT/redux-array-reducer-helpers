import bindIndexToActionCreators from '@/binders/bind_index_to_action_creators';

describe('simple action creators', () => {
  it('It should inject index property', () => {
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
});