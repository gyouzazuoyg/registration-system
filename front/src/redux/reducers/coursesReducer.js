const initialState = {
  courses: [],
};

export const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_JOBS':
      return {
        ...state,
        courses: action.payload,
      };
    default:
      return state;
  }
};
