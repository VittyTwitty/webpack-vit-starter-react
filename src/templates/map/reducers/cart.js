let ducksInCart = []

export default function cart(state = [], action) {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [
        ...state,
        action.payload
      ];
    case 'DELETE_FROM_CART':
      return state.filter(todo =>
        todo.id !== action.payload
      );


    default:
      return state

  }

}