import TYPE_APP from "../type";
const init = {
  id: undefined,
};

const courseReducer = (state = init, action) => {
  switch (action.type) {
    case TYPE_APP.UPDATE_ID_COURSE:
      return {
        ...state,
        id: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
