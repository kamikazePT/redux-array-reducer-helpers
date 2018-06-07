import bindIndexToActionCreators from '@/binders/bind_index_to_action_creators';

describe('simple action creators', () => {
  it('It should inject index property', () => {
    const actionCreator = () => ({
      type : 'TEST_ACTION'
    });

    const indexToInject = 2;

    const expectedAction = {
      type : 'TEST_ACTION',
      index : indexToInject
    };

    const boundActionCreator = bindIndexToActionCreators(actionCreator, indexToInject);

    expect(boundActionCreator()).toEqual(expectedAction);
  });
});