export default (state={account: {}}, action) => {
    switch(action.type) {
      case 'SET_ACCOUNT':
        return {
          ...state,
          account: action.account,
        };
      default:
        return state;
    }
  };