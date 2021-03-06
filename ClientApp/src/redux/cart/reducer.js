import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_CART_ITEMS
} from "./types";

const initialState = {
  items: []
};

const mergeItemWithList = (list, item) => {
  if (list.length) {
    let updated = false;

    const composedList = list.map(listItem => {
      if (item.id === listItem.id) {
        updated = true;

        return {
          ...listItem,
          quantity: item.quantity + listItem.quantity
        };
      }
      return listItem;
    });

    if (!updated) {
      composedList.push(item);
    }

    return composedList;
  }
  return [item];
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      return {
        ...state,
        items: mergeItemWithList(state.items, action.payload)
      };
    case REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        items: state.items.filter(({ id }) => id !== action.payload.id)
      };
    case SET_CART_ITEMS:
      return {
        ...state,
        items: []
      };
    default:
      return state;
  }
};
