export default(state, action) => {
  console.log(action)
  switch(action.type) {
    case "ADD_USER":
      return {
        ...state,
        list : action.list
      };
    case "USER_FORM": 
      return {
        ...state,
        user: action.user,
        error: action.error,
        formValid: action.formValid
      };
    default:
      return state;
  }
}