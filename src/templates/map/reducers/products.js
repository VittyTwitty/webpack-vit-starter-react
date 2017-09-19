const initialState = [
  {
    id: 1,
    title: 'Samsung',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, similique!',
    price: 278
  },
  {
    id: 2,
    title: 'Nokia',
    description: 'Lorem ipsum dolor sit amet.',
    price: 200
  },
];

export default function products(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PRODUCT':
      console.log("added ADD");
      return [
        ...state,
        action.payload
      ];
    case 'DELETE_PRODUCT':
      return state.filter(item =>
        item.id !== action.payload
      );
    default:
      return state

  }

}