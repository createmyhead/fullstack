import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;