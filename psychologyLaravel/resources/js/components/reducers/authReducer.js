// reducers/authReducer.js
const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    user: null
};
  
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};
  
  export default authReducer;