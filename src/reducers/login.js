export default(state = false, action) => {
    switch(action.type) {
        case 'LOGIN':
            return action.loggedIn
        default:
            return state;
    }
};