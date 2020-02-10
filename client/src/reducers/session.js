export default (state={session: {}}, action) => {
    switch(action.type) {
      case 'SET_SESSION_TOKEN':
        return {
          ...state,
          sessionToken: action.token,
        };
      default:
        return state;
    }
  };